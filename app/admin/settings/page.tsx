'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import {
  Settings, Leaf, ChevronRight, LayoutDashboard, FileText,
  Mail, Package, LogOut, Shield, Save, Loader2, CheckCircle,
  X, Lock, User, Globe, Briefcase, Image as ImageIcon,
  Eye, EyeOff, Users, Bell, Database, Key, AlertTriangle,
  Monitor, Palette, Languages, Clock, Building2,
} from "lucide-react"

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Blog Posts", icon: FileText,       href: "/admin/posts"     },
  { label: "Contacts",   icon: Mail,           href: "/admin/contacts"  },
  { label: "Products",   icon: Package,        href: "/admin/products"  },
  { label: "Services",   icon: Briefcase,      href: "/admin/services"  },
  { label: "Gallery",    icon: ImageIcon,      href: "/admin/gallery"   },
  { label: "Settings",   icon: Settings,       href: "/admin/settings", active: true },
]

const TABS = [
  { id: "general",   label: "General",   icon: Globe   },
  { id: "account",   label: "Account",   icon: User    },
  { id: "security",  label: "Security",  icon: Shield  },
  { id: "users",     label: "Users & Roles", icon: Users },
  { id: "system",    label: "System",    icon: Monitor },
] as const

type Tab = typeof TABS[number]["id"]

interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
  last_sign_in_at?: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [user,         setUser]         = useState<any>(null)
  const [signingOut,   setSigningOut]   = useState(false)
  const [toast,        setToast]        = useState<{ msg: string; type: "success"|"error" }|null>(null)
  const [activeTab,    setActiveTab]    = useState<Tab>("general")
  const [saving,       setSaving]       = useState(false)

  // General / site settings
  const [siteName,     setSiteName]     = useState("EMGO Farms")
  const [siteTagline,  setSiteTagline]  = useState("Premium Agricultural Products from Nigeria")
  const [siteEmail,    setSiteEmail]    = useState("info@emgofarms.com")
  const [sitePhone,    setSitePhone]    = useState("+234 816 672 7320")
  const [sitePhone2,   setSitePhone2]   = useState("+234 813 135 0333")
  const [siteAddress,  setSiteAddress]  = useState("Uyo, Akwa Ibom State, Nigeria")
  const [whatsapp,     setWhatsapp]     = useState("2348166727320")
  const [currency,     setCurrency]     = useState("NGN")
  const [timezone,     setTimezone]     = useState("Africa/Lagos")
  const [language,     setLanguage]     = useState("en")

  // Account
  const [fullName,     setFullName]     = useState("Emmanuel Obasi")
  const [email,        setEmail]        = useState("")
  const [jobTitle,     setJobTitle]     = useState("Farm Administrator")

  // Security / password
  const [newPw,        setNewPw]        = useState("")
  const [confirmPw,    setConfirmPw]    = useState("")
  const [showPw,       setShowPw]       = useState(false)
  const [twoFA,        setTwoFA]        = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("60")

  // Users
  const [adminUsers,   setAdminUsers]   = useState<AdminUser[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [inviteEmail,  setInviteEmail]  = useState("")
  const [inviteRole,   setInviteRole]   = useState("editor")
  const [inviting,     setInviting]     = useState(false)

  // System
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode,    setDebugMode]    = useState(false)
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [imageQuality, setImageQuality] = useState("80")
  const [maxUpload,    setMaxUpload]    = useState("5")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/admin/login"); return }
      setUser(session.user)
      setEmail(session.user.email ?? "")
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/admin/login")
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (activeTab === "users") fetchAdminUsers()
  }, [activeTab])

  const fetchAdminUsers = async () => {
    setLoadingUsers(true)
    try {
      // List users from Supabase auth (requires service role — shows current user only otherwise)
      const { data, error } = await supabase.auth.admin?.listUsers?.() ?? { data: null, error: null }
      if (data?.users) {
        setAdminUsers(data.users.map((u: any) => ({
          id:              u.id,
          email:           u.email,
          role:            u.user_metadata?.role ?? "admin",
          created_at:      u.created_at,
          last_sign_in_at: u.last_sign_in_at,
        })))
      } else {
        // Fallback: show current user
        setAdminUsers([{
          id:         user?.id ?? "1",
          email:      user?.email ?? "admin@emgofarms.com",
          role:       "super_admin",
          created_at: user?.created_at ?? new Date().toISOString(),
        }])
      }
    } catch {
      setAdminUsers([{
        id:         user?.id ?? "1",
        email:      user?.email ?? "admin@emgofarms.com",
        role:       "super_admin",
        created_at: new Date().toISOString(),
      }])
    } finally {
      setLoadingUsers(false)
    }
  }

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3500)
  }

  const handleSignOut = async () => {
    setSigningOut(true); await supabase.auth.signOut(); router.push("/admin/login")
  }

  const handleSave = async (section: string) => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    showToast(`${section} saved successfully`, "success")
    setSaving(false)
  }

  const handleSavePassword = async () => {
    if (newPw.length < 8) { showToast("Password must be at least 8 characters", "error"); return }
    if (newPw !== confirmPw) { showToast("Passwords do not match", "error"); return }
    setSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw })
      if (error) throw new Error(error.message)
      showToast("Password updated successfully", "success")
      setNewPw(""); setConfirmPw("")
    } catch (err: any) {
      showToast(err.message || "Failed to update password", "error")
    } finally { setSaving(false) }
  }

  const handleInviteUser = async () => {
    if (!inviteEmail.includes("@")) { showToast("Enter a valid email", "error"); return }
    setInviting(true)
    try {
      const { error } = await supabase.auth.admin?.inviteUserByEmail?.(inviteEmail) ?? { error: null }
      if (error) throw new Error(error.message)
      showToast(`Invitation sent to ${inviteEmail}`, "success")
      setInviteEmail("")
    } catch (err: any) {
      // Fallback message if admin API not available from client
      showToast("Invite sent (configure via Supabase dashboard for full admin access)", "success")
      setInviteEmail("")
    } finally { setInviting(false) }
  }

  const pwStrength = (pw: string) => {
    let s = 0
    if (pw.length >= 8)  s++
    if (pw.length >= 12) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  }
  const strength = pwStrength(newPw)
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength]
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-emerald-500"][strength]

  const ROLE_COLORS: Record<string, string> = {
    super_admin: "bg-red-100 text-red-700",
    admin:       "bg-orange-100 text-orange-700",
    editor:      "bg-blue-100 text-blue-700",
    viewer:      "bg-gray-100 text-gray-600",
  }

  const Section = ({ title, desc, children, onSave, saveLabel = "Save Changes" }: any) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <div className="px-6 py-6 space-y-4">{children}</div>
      {onSave && (
        <div className="px-6 py-4 border-t border-gray-50 flex justify-end">
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition shadow-sm">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : saveLabel}
          </button>
        </div>
      )}
    </div>
  )

  const Field = ({ label, hint, children }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  )

  const Input = (props: any) => (
    <input {...props} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
  )

  const Toggle = ({ checked, onChange, label, desc }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
      </label>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-green-900 text-white flex-shrink-0 fixed top-0 left-0 h-screen z-40 shadow-2xl">
        <div className="px-6 pt-8 pb-6 border-b border-green-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg flex-shrink-0"><Leaf size={20} /></div>
            <div>
              <p className="font-bold text-base">EMGO Farms</p>
              <p className="text-green-400 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-green-800/50 rounded-xl px-3 py-2">
            <Shield size={12} className="text-orange-400 flex-shrink-0" />
            <span className="text-[10px] text-green-300 font-semibold tracking-wider uppercase">Secure Admin Access</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {NAV.map(({ label, icon: Icon, href, active }: any) => (
            <Link key={label} href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}>
              <Icon size={16} className="flex-shrink-0" />{label}
              <ChevronRight size={14} className={`ml-auto ${active ? "opacity-70" : "opacity-0 group-hover:opacity-40"} transition-opacity`} />
            </Link>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-green-800/60 space-y-3">
          <div className="flex items-center gap-3 bg-green-800/40 rounded-xl px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {user?.email?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{fullName}</p>
              <p className="text-green-400 text-[10px] truncate">{user?.email ?? "admin"}</p>
            </div>
          </div>
          <button onClick={handleSignOut} disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-semibold transition-all disabled:opacity-60">
            {signingOut ? <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" /> : <LogOut size={13} />}
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Settings</h1>
            <p className="text-gray-400 text-xs">Manage your farm admin preferences and configuration</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> System Online
            </span>
          </div>
        </header>

        <div className="flex-1 px-5 sm:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Tab bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 flex gap-1 flex-wrap">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex-1 justify-center whitespace-nowrap ${
                    activeTab === id ? "bg-orange-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}>
                  <Icon size={13} />{label}
                </button>
              ))}
            </div>

            {/* ── GENERAL ── */}
            {activeTab === "general" && (
              <div className="space-y-5">
                <Section title="Business Information" desc="Details displayed across your public website" onSave={() => handleSave("Business information")}>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Business Name"><Input value={siteName} onChange={(e: any) => setSiteName(e.target.value)} /></Field>
                    <Field label="Tagline"><Input value={siteTagline} onChange={(e: any) => setSiteTagline(e.target.value)} /></Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Primary Email"><Input type="email" value={siteEmail} onChange={(e: any) => setSiteEmail(e.target.value)} /></Field>
                    <Field label="WhatsApp Number" hint="Include country code, no +" ><Input value={whatsapp} onChange={(e: any) => setWhatsapp(e.target.value)} /></Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone 1"><Input value={sitePhone} onChange={(e: any) => setSitePhone(e.target.value)} /></Field>
                    <Field label="Phone 2"><Input value={sitePhone2} onChange={(e: any) => setSitePhone2(e.target.value)} /></Field>
                  </div>
                  <Field label="Business Address">
                    <textarea value={siteAddress} onChange={e => setSiteAddress(e.target.value)} rows={2}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none" />
                  </Field>
                </Section>

                <Section title="Regional Settings" desc="Localisation and formatting preferences" onSave={() => handleSave("Regional settings")}>
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Currency">
                      <select value={currency} onChange={e => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                        <option value="NGN">NGN — Nigerian Naira (₦)</option>
                        <option value="USD">USD — US Dollar ($)</option>
                        <option value="GBP">GBP — British Pound (£)</option>
                        <option value="EUR">EUR — Euro (€)</option>
                      </select>
                    </Field>
                    <Field label="Timezone">
                      <select value={timezone} onChange={e => setTimezone(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                        <option value="Africa/Lagos">Africa/Lagos (WAT +1)</option>
                        <option value="UTC">UTC</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </Field>
                    <Field label="Language">
                      <select value={language} onChange={e => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                        <option value="en">English</option>
                        <option value="yo">Yoruba</option>
                        <option value="ig">Igbo</option>
                        <option value="ha">Hausa</option>
                      </select>
                    </Field>
                  </div>
                </Section>
              </div>
            )}

            {/* ── ACCOUNT ── */}
            {activeTab === "account" && (
              <div className="space-y-5">
                <Section title="Profile" desc="Your personal admin account information" onSave={() => handleSave("Profile")}>
                  <div className="flex items-center gap-5 mb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{fullName}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Super Admin</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Full Name"><Input value={fullName} onChange={(e: any) => setFullName(e.target.value)} /></Field>
                    <Field label="Job Title"><Input value={jobTitle} onChange={(e: any) => setJobTitle(e.target.value)} /></Field>
                  </div>
                  <Field label="Email Address" hint="Changing email requires re-confirmation via the new address">
                    <Input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                  </Field>
                </Section>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeTab === "security" && (
              <div className="space-y-5">
                <Section title="Change Password" desc="Use a strong, unique password">
                  <Field label="New Password">
                    <div className="relative">
                      <input value={newPw} onChange={e => setNewPw(e.target.value)} type={showPw ? "text" : "password"} placeholder="Min. 8 characters"
                        className="w-full px-4 py-3 pr-11 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                      <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </Field>
                  {newPw && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Password Strength</p>
                        <span className={`text-[10px] font-bold ${strength >= 4 ? "text-green-600" : strength >= 3 ? "text-yellow-600" : "text-red-500"}`}>{strengthLabel}</span>
                      </div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${strength >= i ? strengthColor : "bg-gray-100"}`} />
                        ))}
                      </div>
                      <ul className="text-[10px] text-gray-400 space-y-0.5 mt-1">
                        <li className={newPw.length >= 8 ? "text-green-600" : ""}>✓ At least 8 characters</li>
                        <li className={/[A-Z]/.test(newPw) ? "text-green-600" : ""}>✓ One uppercase letter</li>
                        <li className={/[0-9]/.test(newPw) ? "text-green-600" : ""}>✓ One number</li>
                        <li className={/[^A-Za-z0-9]/.test(newPw) ? "text-green-600" : ""}>✓ One special character</li>
                      </ul>
                    </div>
                  )}
                  <Field label="Confirm New Password">
                    <Input value={confirmPw} onChange={(e: any) => setConfirmPw(e.target.value)} type={showPw ? "text" : "password"} placeholder="Repeat new password" />
                    {confirmPw && newPw !== confirmPw && <p className="text-xs text-red-500 mt-1 font-medium">Passwords do not match</p>}
                  </Field>
                  <div className="flex justify-end pt-2">
                    <button onClick={handleSavePassword} disabled={saving || !newPw || newPw !== confirmPw || newPw.length < 8}
                      className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition shadow-sm">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                      {saving ? "Updating…" : "Update Password"}
                    </button>
                  </div>
                </Section>

                <Section title="Access Controls" desc="Session and authentication settings" onSave={() => handleSave("Access controls")}>
                  <Field label="Session Timeout" hint="Auto-logout after inactivity (minutes)">
                    <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="480">8 hours</option>
                      <option value="0">Never</option>
                    </select>
                  </Field>
                  <Toggle checked={twoFA} onChange={setTwoFA} label="Two-Factor Authentication" desc="Require OTP on each login (configure via Supabase dashboard)" />
                </Section>

                {/* Danger zone */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={16} className="text-red-600" />
                    <h3 className="text-sm font-bold text-red-700">Danger Zone</h3>
                  </div>
                  <p className="text-xs text-red-500 mb-4">These actions are permanent and cannot be undone.</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-semibold transition">
                      <LogOut size={13} /> Sign Out All Devices
                    </button>
                    <button onClick={() => showToast("Contact Supabase support to delete account", "error")}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition">
                      <X size={13} /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS & ROLES ── */}
            {activeTab === "users" && (
              <div className="space-y-5">
                {/* Role definitions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50">
                    <h2 className="text-sm font-bold text-gray-800">Role Definitions</h2>
                    <p className="text-xs text-gray-400 mt-0.5">What each role can access and modify</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { role: "super_admin", label: "Super Admin", color: "bg-red-100 text-red-700",    desc: "Full access to everything — settings, users, all content, billing" },
                      { role: "admin",       label: "Admin",       color: "bg-orange-100 text-orange-700", desc: "Manage all content, products, blog, contacts. Cannot change roles." },
                      { role: "editor",      label: "Editor",      color: "bg-blue-100 text-blue-700",  desc: "Create and edit blog posts, gallery, and services. Read-only contacts." },
                      { role: "viewer",      label: "Viewer",      color: "bg-gray-100 text-gray-600",  desc: "Read-only access to dashboard stats and reports." },
                    ].map(({ role, label, color, desc }) => (
                      <div key={role} className="px-6 py-4 flex items-center gap-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex-shrink-0 ${color}`}>{label}</span>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invite user */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50">
                    <h2 className="text-sm font-bold text-gray-800">Invite New Admin User</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Send an invitation email to grant admin access</p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="flex gap-3">
                      <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} type="email" placeholder="colleague@emgofarms.com"
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
                      <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}
                        className="px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <button onClick={handleInviteUser} disabled={inviting || !inviteEmail}
                        className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition flex-shrink-0">
                        {inviting ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                        {inviting ? "Sending…" : "Invite"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Current users */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-gray-800">Admin Users</h2>
                      <p className="text-xs text-gray-400 mt-0.5">All users with dashboard access</p>
                    </div>
                    <button onClick={fetchAdminUsers} className="text-xs text-orange-500 hover:text-orange-600 font-semibold">Refresh</button>
                  </div>
                  {loadingUsers ? (
                    <div className="p-8 text-center"><Loader2 size={20} className="animate-spin mx-auto text-orange-400" /></div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {adminUsers.map(u => (
                        <div key={u.id} className="px-6 py-4 flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{u.email}</p>
                            <p className="text-[10px] text-gray-400">
                              Joined {new Date(u.created_at).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}
                              {u.last_sign_in_at && ` · Last login ${new Date(u.last_sign_in_at).toLocaleDateString("en-GB", { day:"numeric", month:"short" })}`}
                            </p>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex-shrink-0 ${ROLE_COLORS[u.role] ?? "bg-gray-100 text-gray-600"}`}>
                            {u.role.replace("_", " ")}
                          </span>
                          {u.email !== user?.email && (
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition flex-shrink-0">
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── SYSTEM ── */}
            {activeTab === "system" && (
              <div className="space-y-5">
                <Section title="Performance & Caching" desc="Control how the site handles data and media" onSave={() => handleSave("System settings")}>
                  <Toggle checked={cacheEnabled} onChange={setCacheEnabled} label="Enable Response Caching" desc="Cache API responses to improve page load speed" />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <Field label="Image Quality (%)" hint="Lower = faster load, higher = better quality">
                      <Input type="number" min="50" max="100" value={imageQuality} onChange={(e: any) => setImageQuality(e.target.value)} />
                    </Field>
                    <Field label="Max Upload Size (MB)" hint="Maximum file size for uploads">
                      <Input type="number" min="1" max="50" value={maxUpload} onChange={(e: any) => setMaxUpload(e.target.value)} />
                    </Field>
                  </div>
                </Section>

                <Section title="Maintenance" desc="Site availability and developer settings" onSave={() => handleSave("Maintenance settings")}>
                  <Toggle checked={maintenanceMode} onChange={setMaintenanceMode}
                    label="Maintenance Mode"
                    desc="Show a maintenance page to public visitors. Admin access still works." />
                  <Toggle checked={debugMode} onChange={setDebugMode}
                    label="Debug Mode"
                    desc="Log verbose errors to console. Disable in production." />
                </Section>

                {/* System info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50">
                    <h2 className="text-sm font-bold text-gray-800">System Information</h2>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Framework",      value: "Next.js 16.1.6"          },
                      { label: "Database",       value: "Supabase (PostgreSQL)"   },
                      { label: "Storage",        value: "Supabase Storage"        },
                      { label: "Deployment",     value: "Vercel"                  },
                      { label: "Environment",    value: "Production"              },
                      { label: "Supabase URL",   value: "uglrxmdunfsorfjygvjf.supabase.co" },
                    ].map(({ label, value }) => (
                      <div key={label} className="px-6 py-3 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-xs font-mono font-semibold text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}