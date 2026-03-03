import { useEffect, useState } from "react";
import API from "../api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        setProfile(res.data);
      } catch {
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const StatCard = ({ icon, label, value }) => (
    <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      {/* Header with decorative element */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-5" />
        <div className="relative py-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Welcome back to your style space</p>
        </div>
      </div>

      {profile && (
        <>
          {/* Welcome Section with Stats */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {profile.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Welcome, {profile.name}
                  </h2>
                  <p className="text-slate-500">Your personal style profile</p>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="📧" label="Email" value={profile.email} />
                <StatCard icon="📏" label="Height" value={profile.height_cm ? `${profile.height_cm} cm` : "Not set"} />
                <StatCard icon="⚖️" label="Weight" value={profile.weight_kg ? `${profile.weight_kg} kg` : "Not set"} />
                <StatCard icon="📍" label="Location" value={profile.location || "Not set"} />
              </div>
            </div>
          </div>

          {/* Detailed Profile Information */}
          <Card className="mb-8 rounded-2xl border-0 shadow-xl bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>📋</span> Complete Profile Details
              </h3>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* BASIC INFO */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="text-2xl">👤</span>
                    <h3 className="text-lg font-semibold text-slate-800">Basic Info</h3>
                  </div>
                  <div className="space-y-3">
                    <InfoRow label="Email" value={profile.email} />
                    <InfoRow label="Age" value={profile.age || "Not set"} />
                    <InfoRow label="Gender" value={profile.gender || "Not set"} />
                    <InfoRow label="Location" value={profile.location || "Not set"} />
                    <InfoRow label="Profession" value={profile.profession || "Not set"} />
                  </div>
                </div>

                {/* BODY DETAILS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="text-2xl">💪</span>
                    <h3 className="text-lg font-semibold text-slate-800">Body Details</h3>
                  </div>
                  <div className="space-y-3">
                    <InfoRow label="Height" value={profile.height_cm ? `${profile.height_cm} cm` : "Not set"} />
                    <InfoRow label="Weight" value={profile.weight_kg ? `${profile.weight_kg} kg` : "Not set"} />
                    <InfoRow label="Body Type" value={profile.body_type || "Not set"} />
                    <InfoRow label="Skin Tone" value={profile.skin_tone || "Not set"} />
                    <InfoRow label="Fit Preference" value={profile.fit_preference || "Not set"} />
                  </div>
                </div>

                {/* STYLE PREFERENCES */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="text-2xl">🎨</span>
                    <h3 className="text-lg font-semibold text-slate-800">Style Preferences</h3>
                  </div>
                  <div className="space-y-3">
                    <InfoRow label="Budget" value={profile.budget_range || "Not set"} />
                    <InfoRow label="Comfort Level" value={profile.comfort_level || "Not set"} />
                    
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-600">Styles</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.style_preferences?.length > 0 ? (
                          profile.style_preferences.map((style, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full border border-blue-100"
                            >
                              {style}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Not set</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-600">Favorite Colors</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.favorite_colors?.length > 0 ? (
                          profile.favorite_colors.map((color, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full border border-green-100"
                            >
                              {color}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Not set</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium text-slate-600">Disliked Colors</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.disliked_colors?.length > 0 ? (
                          profile.disliked_colors.map((color, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-full border border-red-100"
                            >
                              {color}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">Not set</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            icon="👕"
            title="Manage Wardrobe"
            description="Organize and update your clothing collection"
            onClick={() => navigate("/wardrobe")}
            gradient="from-blue-500 to-blue-600"
          />
          
          <ActionCard
            icon="🤖"
            title="Ask AI Stylist"
            description="Get personalized style recommendations"
            onClick={() => navigate("/chat")}
            gradient="from-purple-500 to-purple-600"
          />
          
          <ActionCard
            icon="🧍"
            title="Update Profile"
            description="Edit your personal information and preferences"
            onClick={() => navigate("/profile")}
            gradient="from-pink-500 to-pink-600"
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-sm font-semibold text-slate-800">{value}</span>
  </div>
);

const ActionCard = ({ icon, title, description, onClick, gradient }) => (
  <Card
    className="group relative overflow-hidden rounded-2xl border-0 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
    <CardContent className="relative p-6 text-white">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-sm text-white/80">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium">
        <span>Get started</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;