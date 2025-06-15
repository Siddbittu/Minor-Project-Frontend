import React from 'react';
import { Brain, Database, Shield, Zap, Network, BarChart3 } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Advanced AI algorithms trained on network traffic patterns to predict failures accurately.'
    },
    {
      icon: Database,
      title: 'Real-time Analysis',
      description: 'Process network data in real-time to provide instant insights and predictions.'
    },
    {
      icon: Shield,
      title: 'Proactive Monitoring',
      description: 'Detect potential issues before they cause network downtime or performance degradation.'
    },
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'Get predictions in milliseconds with high accuracy and reliability.'
    },
    {
      icon: Network,
      title: 'Multi-Protocol Support',
      description: 'Support for TCP, UDP, ICMP protocols across various network devices.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics to understand network health trends and patterns.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Our Technology</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our network status prediction system leverages cutting-edge machine learning 
            to analyze network patterns and predict potential failures before they occur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <feature.icon className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="text-white font-semibold">Data Collection</h4>
                    <p className="text-gray-300 text-sm">Network parameters are collected including IP addresses, protocols, packet sizes, latency, and error rates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="text-white font-semibold">AI Analysis</h4>
                    <p className="text-gray-300 text-sm">Our machine learning model analyzes the data patterns and compares them to historical failure signatures.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="text-white font-semibold">Prediction</h4>
                    <p className="text-gray-300 text-sm">The system provides instant predictions about potential network issues or confirms normal operation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">Supported Predictions</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">Device Failure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Packet Loss</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Latency Spike</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Normal Operation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;