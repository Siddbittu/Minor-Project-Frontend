import React from 'react';
import { Activity, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">NetPredict</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Advanced AI-powered network monitoring and failure prediction system. 
              Detect issues before they impact your infrastructure.
            </p>
            <div className="flex space-x-4">
              <a
                href="#portfolio"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>View Portfolio</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Prediction
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                About
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="#github"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="#linkedin"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="#email"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 NetPredict. Built with passion for network reliability.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with React & TypeScript</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;