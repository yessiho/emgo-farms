import { getServerSession } from "next-auth";

if (!session) {
  redirect("/admin/login");
}
