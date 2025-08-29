const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CarRental</h2>
          <p className="mt-3 text-sm">
            Rent your car easily with affordable hourly & daily rentals. 
            No hidden charges, just smooth rides!
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red">Home</a></li>
            <li><a href="/cars" className="hover:text-red">Cars</a></li>
            <li><a href="/pricing" className="hover:text-red">Pricing</a></li>
            <li><a href="/faq" className="hover:text-red">FAQ</a></li>
            <li><a href="/contact" className="hover:text-red">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
          <p className="text-sm">📍 Mumbai, India</p>
          <p className="text-sm">📧 support@carrental.com</p>
          <p className="text-sm">📞 +91 98765 43210</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
