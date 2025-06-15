import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle, Loader, Activity } from 'lucide-react';

interface PredictionData {
  timestamp: string;
  source_ip: string;
  dest_ip: string;
  protocol: string;
  packet_size: number;
  latency_ms: number;
  error_rate: number;
  device_type: string;
}

interface PredictionResult {
  predicted_issue_type: string;
}

const PredictionForm = () => {
  const [formData, setFormData] = useState<PredictionData>({
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    source_ip: '192.168.1.1',
    dest_ip: '8.8.8.8',
    protocol: 'TCP',
    packet_size: 512,
    latency_ms: 90.0,
    error_rate: 0.2,
    device_type: 'router'
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown');

  const checkHealth = async () => {
    try {
      const response = await fetch('https://minor-project-api.onrender.com/health');
      if (response.ok) {
        setHealthStatus('healthy');
      } else {
        setHealthStatus('unhealthy');
      }
    } catch (err) {
      setHealthStatus('unhealthy');
    }
  };

  React.useEffect(() => {
    checkHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['packet_size', 'latency_ms', 'error_rate'].includes(name) 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://minor-project-api.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  const getIssueTypeColor = (issueType: string) => {
    switch (issueType.toLowerCase()) {
      case 'device_failure': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'packet_loss': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'latency_spike': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'none': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  const getIssueTypeIcon = (issueType: string) => {
    switch (issueType.toLowerCase()) {
      case 'device_failure': return <AlertCircle className="h-6 w-6" />;
      case 'packet_loss': return <AlertCircle className="h-6 w-6" />;
      case 'latency_spike': return <AlertCircle className="h-6 w-6" />;
      case 'none': return <CheckCircle className="h-6 w-6" />;
      default: return <Activity className="h-6 w-6" />;
    }
  };

  const getIssueDescription = (issueType: string) => {
    switch (issueType.toLowerCase()) {
      case 'device_failure': return 'Critical hardware or device malfunction detected';
      case 'packet_loss': return 'Network packets are being dropped during transmission';
      case 'latency_spike': return 'Unusual delay in network response times detected';
      case 'none': return 'Network is operating within normal parameters';
      default: return 'Unknown prediction result';
    }
  };

  return (
    <section id="predict" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Network Status Prediction</h2>
          <p className="text-xl text-gray-300 mb-6">Enter network parameters to predict potential issues using AI</p>
          
          {/* Health Status */}
          <div className="flex justify-center">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              healthStatus === 'healthy' ? 'bg-green-500/20 border border-green-500/30' :
              healthStatus === 'unhealthy' ? 'bg-red-500/20 border border-red-500/30' :
              'bg-gray-500/20 border border-gray-500/30'
            }`}>
              <Activity className={`h-4 w-4 ${
                healthStatus === 'healthy' ? 'text-green-400' :
                healthStatus === 'unhealthy' ? 'text-red-400' :
                'text-gray-400'
              } ${healthStatus === 'healthy' ? 'animate-pulse' : ''}`} />
              <span className={`text-sm font-medium ${
                healthStatus === 'healthy' ? 'text-green-400' :
                healthStatus === 'unhealthy' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                API Status: {
                  healthStatus === 'healthy' ? 'Online' : 
                  healthStatus === 'unhealthy' ? 'Offline' : 
                  'Checking...'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timestamp
                </label>
                <input
                  type="text"
                  name="timestamp"
                  value={formData.timestamp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="2025-01-01 12:00:00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Protocol
                </label>
                <select
                  name="protocol"
                  value={formData.protocol}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                  <option value="ICMP">ICMP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Source IP Address
                </label>
                <input
                  type="text"
                  name="source_ip"
                  value={formData.source_ip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="192.168.1.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Destination IP Address
                </label>
                <input
                  type="text"
                  name="dest_ip"
                  value={formData.dest_ip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="8.8.8.8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Packet Size (bytes)
                </label>
                <input
                  type="number"
                  name="packet_size"
                  value={formData.packet_size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  min="1"
                  max="65535"
                  placeholder="512"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Latency (milliseconds)
                </label>
                <input
                  type="number"
                  name="latency_ms"
                  value={formData.latency_ms}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  min="0"
                  placeholder="90.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Error Rate (0.0 - 1.0)
                </label>
                <input
                  type="number"
                  name="error_rate"
                  value={formData.error_rate}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0.2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Device Type
                </label>
                <select
                  name="device_type"
                  value={formData.device_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="router">Router</option>
                  <option value="switch">Switch</option>
                  <option value="firewall">Firewall</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || healthStatus === 'unhealthy'}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Analyzing Network Data...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Predict Network Status
                </>
              )}
            </button>
          </form>

          {/* Results */}
          {result && (
            <div className={`mt-8 p-6 rounded-xl border transition-all ${getIssueTypeColor(result.predicted_issue_type)}`}>
              <div className="flex items-start">
                {getIssueTypeIcon(result.predicted_issue_type)}
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
                  <div className="space-y-2">
                    <p className="text-sm opacity-90">
                      <span className="font-medium">Issue Type:</span>{' '}
                      <span className="font-bold uppercase tracking-wide">
                        {result.predicted_issue_type.replace('_', ' ')}
                      </span>
                    </p>
                    <p className="text-sm opacity-80">
                      <span className="font-medium">Description:</span>{' '}
                      {getIssueDescription(result.predicted_issue_type)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl">
              <div className="flex items-center text-red-400">
                <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Prediction Error</h3>
                  <p className="text-sm opacity-90 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;