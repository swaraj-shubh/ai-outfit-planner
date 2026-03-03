import { useState } from "react";
import API from "../api/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

function Chat() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parseError, setParseError] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setParseError(false);
    
    try {
      const res = await API.post("/chat", { message });
      
      // Check if response contains error from parser
      if (res.data.error) {
        setParseError(true);
        // Try to extract from raw_response if available
        if (res.data.raw_response) {
          const extractedData = extractDataFromRawResponse(res.data.raw_response);
          setResult(extractedData);
        } else {
          setResult(res.data);
        }
      } else {
        setResult(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setParseError(true);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract data from raw response
  const extractDataFromRawResponse = (rawText) => {
    const defaultData = {
      w_top: "",
      w_bottom: "",
      w_footwear: "",
      w_accessories: "",
      u_top: "",
      u_bottom: "",
      u_footwear: "",
      u_accessories: "",
      tip: ""
    };

    try {
      // Try to extract key-value pairs
      const extracted = {};
      const patterns = [
        /"w_top"\s*:\s*"([^"]*)"/i,
        /"w_bottom"\s*:\s*"([^"]*)"/i,
        /"w_footwear"\s*:\s*"([^"]*)"/i,
        /"w_accessories"\s*:\s*"([^"]*)"/i,
        /"u_top"\s*:\s*"([^"]*)"/i,
        /"u_bottom"\s*:\s*"([^"]*)"/i,
        /"u_footwear"\s*:\s*"([^"]*)"/i,
        /"u_accessories"\s*:\s*"([^"]*)"/i,
        /"tip"\s*:\s*"([^"]*)"/i
      ];

      patterns.forEach(pattern => {
        const match = rawText.match(pattern);
        if (match && match[1]) {
          const key = pattern.source.match(/"([^"]+)"/)[1];
          extracted[key] = match[1];
        }
      });

      return { ...defaultData, ...extracted };
    } catch (e) {
      return { ...defaultData, tip: "Could not parse response properly" };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  // Check if item exists (not empty string)
  const hasItem = (item) => item && item.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-5xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20" />
              <span className="relative text-6xl md:text-7xl inline-block transform hover:scale-110 transition-transform duration-300">
                👗
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
              AI Style
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Consultant
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Your personal fashion assistant, ready to help you look your best for any occasion
          </p>
        </motion.div>

        {/* Main Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden rounded-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
            {/* Card Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
            
            {/* Inner Content */}
            <div className="relative p-6 md:p-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-2xl">💭</span>
                  <span className="font-medium">Ask me anything about style</span>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="e.g., What should I wear to a summer wedding? or Suggest an outfit for a job interview"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[120px] p-5 text-base rounded-2xl border-2 border-slate-200 focus:border-blue-400 focus:ring-blue-400 resize-none bg-white/90 transition-all duration-300 pr-24"
                  />
                  
                  {/* Character count */}
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
                    {message.length}/500
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 justify-end">
                  {message && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setMessage("")}
                      className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Clear
                    </motion.button>
                  )}
                  
                  <Button
                    onClick={askAI}
                    disabled={loading || !message.trim()}
                    className="relative px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="flex items-center gap-3">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Thinking...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Style Advice</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                      )}
                    </span>
                  </Button>
                </div>

                {/* Quick Prompts */}
                <div className="flex flex-wrap gap-2 pt-4">
                  <QuickPrompt text="Formal dinner outfit" onClick={setMessage} />
                  <QuickPrompt text="Job interview attire" onClick={setMessage} />
                  <QuickPrompt text="Casual weekend look" onClick={setMessage} />
                  <QuickPrompt text="Date night style" onClick={setMessage} />
                </div>
              </div>

              {/* Response Section */}
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key="response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 pt-8 border-t border-slate-200/50"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg">✨</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {parseError ? "Partial Recommendation" : "Your Personalized Style Recommendation"}
                        </h3>
                        {parseError && (
                          <p className="text-xs text-amber-600 mt-1">
                            ⚠️ Response was partially recovered
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Main Response Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* From Your Wardrobe Section */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 shadow-lg h-full">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-8 -mt-8" />
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">👔</span>
                              </div>
                              <h4 className="text-lg font-bold text-slate-800">From Your Wardrobe</h4>
                            </div>
                            
                            <div className="space-y-4">
                              {hasItem(result.w_top) && (
                                <OutfitItem 
                                  label="Top" 
                                  value={result.w_top} 
                                  icon="👕"
                                  gradient="from-blue-500 to-blue-600"
                                />
                              )}
                              {hasItem(result.w_bottom) && (
                                <OutfitItem 
                                  label="Bottom" 
                                  value={result.w_bottom} 
                                  icon="👖"
                                  gradient="from-blue-500 to-blue-600"
                                />
                              )}
                              {hasItem(result.w_footwear) && (
                                <OutfitItem 
                                  label="Footwear" 
                                  value={result.w_footwear} 
                                  icon="👟"
                                  gradient="from-blue-500 to-blue-600"
                                />
                              )}
                              {hasItem(result.w_accessories) && (
                                <OutfitItem 
                                  label="Accessories" 
                                  value={result.w_accessories} 
                                  icon="⌚"
                                  gradient="from-blue-500 to-blue-600"
                                />
                              )}
                              {!hasItem(result.w_top) && !hasItem(result.w_bottom) && 
                               !hasItem(result.w_footwear) && !hasItem(result.w_accessories) && (
                                <p className="text-sm text-slate-500 italic">
                                  No matching items found in your wardrobe
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>

                      {/* Universal Suggestions Section */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-purple-50 to-pink-50/50 shadow-lg h-full">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-8 -mt-8" />
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">✨</span>
                              </div>
                              <h4 className="text-lg font-bold text-slate-800">Universal Suggestions</h4>
                            </div>

                            <div className="space-y-4">
                              {hasItem(result.u_top) && (
                                <OutfitItem 
                                  label="Top" 
                                  value={result.u_top} 
                                  icon="👕"
                                  gradient="from-purple-500 to-pink-500"
                                />
                              )}
                              {hasItem(result.u_bottom) && (
                                <OutfitItem 
                                  label="Bottom" 
                                  value={result.u_bottom} 
                                  icon="👖"
                                  gradient="from-purple-500 to-pink-500"
                                />
                              )}
                              {hasItem(result.u_footwear) && (
                                <OutfitItem 
                                  label="Footwear" 
                                  value={result.u_footwear} 
                                  icon="👟"
                                  gradient="from-purple-500 to-pink-500"
                                />
                              )}
                              {hasItem(result.u_accessories) && (
                                <OutfitItem 
                                  label="Accessories" 
                                  value={result.u_accessories} 
                                  icon="⌚"
                                  gradient="from-purple-500 to-pink-500"
                                />
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Style Tip Section */}
                    {result.tip && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6"
                      >
                        <Card className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <span className="text-white text-xl">💡</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-1">
                                  Style Tip
                                </h5>
                                <p className="text-base text-slate-700 leading-relaxed">
                                  {result.tip}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}

                    {/* Feedback Section */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/50"
                    >
                      <div className="text-xs text-slate-400">
                        AI-powered style recommendation
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Was this helpful?</span>
                        <button className="p-2 hover:bg-blue-50 rounded-full transition-colors group">
                          <span className="text-xl group-hover:scale-110 transition-transform block">👍</span>
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                          <span className="text-xl group-hover:scale-110 transition-transform block">👎</span>
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-center py-16"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-10" />
                    <div className="relative space-y-6">
                      <div className="flex justify-center gap-4">
                        <span className="text-5xl animate-bounce">👔</span>
                        <span className="text-5xl animate-bounce animation-delay-200">👗</span>
                        <span className="text-5xl animate-bounce animation-delay-400">👟</span>
                      </div>
                      <div>
                        <p className="text-slate-400 text-lg mb-2">
                          Ready to help you style your perfect outfit
                        </p>
                        <p className="text-slate-300 text-sm max-w-md mx-auto">
                          Ask about any occasion - from formal events to casual outings, 
                          I'll suggest outfits from your wardrobe and beyond
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <FeatureCard
            icon="👔"
            title="Wardrobe Integration"
            description="Uses your existing wardrobe items for personalized suggestions"
          />
          <FeatureCard
            icon="✨"
            title="Universal Options"
            description="Additional suggestions for items you might want to acquire"
          />
          <FeatureCard
            icon="💡"
            title="Style Tips"
            description="Get expert advice on how to perfect your look"
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// Helper Components
const QuickPrompt = ({ text, onClick }) => (
  <button
    onClick={() => onClick(text)}
    className="px-4 py-2 text-sm bg-white/80 hover:bg-white text-slate-600 rounded-full border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
  >
    {text}
  </button>
);

const FeatureCard = ({ icon, title, description }) => (
  <Card className="p-5 rounded-2xl border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
    <p className="text-sm text-slate-500">{description}</p>
  </Card>
);

const OutfitItem = ({ label, value, icon, gradient }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm shadow-md`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

export default Chat;