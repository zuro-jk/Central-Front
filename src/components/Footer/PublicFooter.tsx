import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function PublicFooter() {
  return (
  <footer className="bg-neutral-900 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Zona de Comida</h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat sunt.
            </p>
            
            {/* Redes sociales */}
            <div className="flex space-x-3">
              <div className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">
                <Facebook size={18} />
              </div>
              <div className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
                <Youtube size={18} />
              </div>
            </div>
          </div>

          {/* Our Menus */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Otros Menus</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Chicken Burger</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Beef Pizza</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Fresh Vegetable</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Sea Foods</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Desserts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Cold Drinks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Discount</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Enlaces útiles</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Restaurant</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Our Chefs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Blogs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> FAQ'S</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center"><span className="text-orange-500 mr-2">→</span> Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Us y Download App */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contacta con nosotras</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-500 p-2 rounded-full mt-1">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">+51 999 999 999</p>
                  <p className="text-gray-300 text-sm">+51 999 999 999</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-full">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">www.foraneos.com</p>
                  <p className="text-gray-300 text-sm">info@foraneos.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-orange-500 p-2 rounded-full mt-1">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Av. Principal 123, Lima – Perú</p>
                  <p className="text-gray-300 text-sm">Otra ubi de otra sede</p>
                </div>
              </div>
            </div>

            {/* Download App */}
            {/* <div>
              <h4 className="text-lg font-semibold mb-4">Descarga la APP</h4>
              <p className="text-gray-300 text-sm mb-4">Ahorre $3 con la aplicación y solo para nuevos usuarios</p>
              
              <div className="space-y-3">
                <a href="#" className="block">
                  <div className="bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg p-3 flex items-center space-x-3">
                    <div className="text-white">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-orange-100">Disponible en:</p>
                      <p className="text-sm font-semibold text-white">Google Play</p>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="block">
                  <div className="bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg p-3 flex items-center space-x-3">
                    <div className="text-white">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-orange-100">Consiguelo en:</p>
                      <p className="text-sm font-semibold text-white">App Store</p>
                    </div>
                  </div>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              ©2025. Todos los derechos reservados por  <span className="text-white font-semibold">Foraneos</span>
            </p>
            
            {/* <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Aceptamos:</span>
              <div className="flex space-x-2">
                <div className="bg-blue-600 px-3 py-1 rounded text-white text-xs font-semibold">PayPal</div>
                <div className="bg-red-500 px-3 py-1 rounded text-white text-xs font-semibold">MasterCard</div>
                <div className="bg-blue-700 px-3 py-1 rounded text-white text-xs font-semibold">VISA</div>
                <div className="bg-purple-500 px-3 py-1 rounded text-white text-xs font-semibold">YAPE</div>
                <div className="bg-blue-800 px-3 py-1 rounded text-white text-xs font-semibold">BCP</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}