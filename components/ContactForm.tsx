export const ContactForm = () => (
  <form className="max-w-lg mx-auto bg-whiteBg shadow-md p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-greenPrimary mb-4">Get in Touch</h2>
    <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded mb-3"/>
    <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded mb-3"/>
    <textarea placeholder="Message" className="w-full p-3 border border-gray-300 rounded mb-3"></textarea>
    <button type="submit" className="bg-orangePrimary text-white font-bold py-2 px-4 rounded hover:bg-orange-600">
      Send Message
    </button>
  </form>
)
