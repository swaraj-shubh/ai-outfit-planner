import { useEffect, useState } from "react";
import API from "../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        setProfile(res.data);
      } catch {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e, field) => {
    setProfile({
      ...profile,
      [field]: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/profile/me", profile);
      alert("Profile updated successfully 🚀");
    } catch {
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <Card className="p-12 rounded-2xl shadow-xl text-center">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Profile Found</h3>
          <p className="text-slate-500">There was an error loading your profile.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-5" />
          <div className="relative py-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Manage your personal information and style preferences</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="max-w-6xl mx-auto rounded-2xl border-0 shadow-xl bg-white overflow-hidden">
        {/* Profile Header with Avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg border-2 border-white/30">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name || "Your Name"}</h2>
              <p className="text-blue-100">{profile.email}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <span className="text-2xl">👤</span>
                <h3 className="text-xl font-semibold text-slate-800">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  icon="📝"
                />
                <FormField
                  label="Email"
                  value={profile.email || ""}
                  disabled
                  icon="📧"
                  note="Email cannot be changed"
                />
                <FormField
                  label="Age"
                  name="age"
                  type="number"
                  value={profile.age || ""}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  icon="🎂"
                />
                <FormField
                  label="Gender"
                  name="gender"
                  value={profile.gender || ""}
                  onChange={handleChange}
                  placeholder="Enter your gender"
                  icon="⚥"
                />
                <FormField
                  label="Location"
                  name="location"
                  value={profile.location || ""}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  icon="📍"
                />
                <FormField
                  label="Profession"
                  name="profession"
                  value={profile.profession || ""}
                  onChange={handleChange}
                  placeholder="Enter your profession"
                  icon="💼"
                />
              </div>
            </div>

            {/* Body Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <span className="text-2xl">💪</span>
                <h3 className="text-xl font-semibold text-slate-800">Body Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Height (cm)"
                  name="height_cm"
                  type="number"
                  value={profile.height_cm || ""}
                  onChange={handleChange}
                  placeholder="Enter your height"
                  icon="📏"
                />
                <FormField
                  label="Weight (kg)"
                  name="weight_kg"
                  type="number"
                  value={profile.weight_kg || ""}
                  onChange={handleChange}
                  placeholder="Enter your weight"
                  icon="⚖️"
                />
                <FormField
                  label="Body Type"
                  name="body_type"
                  value={profile.body_type || ""}
                  onChange={handleChange}
                  placeholder="e.g., Athletic, Slim, Curvy"
                  icon="🔄"
                />
                <FormField
                  label="Skin Tone"
                  name="skin_tone"
                  value={profile.skin_tone || ""}
                  onChange={handleChange}
                  placeholder="Enter your skin tone"
                  icon="🎨"
                />
                <FormField
                  label="Fit Preference"
                  name="fit_preference"
                  value={profile.fit_preference || ""}
                  onChange={handleChange}
                  placeholder="e.g., Loose, Fitted, Regular"
                  icon="👔"
                />
              </div>
            </div>

            {/* Style Preferences Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <span className="text-2xl">✨</span>
                <h3 className="text-xl font-semibold text-slate-800">Style Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Budget Range"
                  name="budget_range"
                  value={profile.budget_range || ""}
                  onChange={handleChange}
                  placeholder="e.g., Budget, Mid-range, Luxury"
                  icon="💰"
                />
                <FormField
                  label="Comfort Level"
                  name="comfort_level"
                  value={profile.comfort_level || ""}
                  onChange={handleChange}
                  placeholder="e.g., Casual, Formal, Sporty"
                  icon="😊"
                />
              </div>

              <div className="space-y-4">
                <TextareaField
                  label="Style Preferences"
                  value={(profile.style_preferences || []).join(", ")}
                  onChange={(e) => handleArrayChange(e, "style_preferences")}
                  placeholder="e.g., Casual, Bohemian, Minimalist, Streetwear"
                  icon="🎯"
                  hint="Separate multiple items with commas"
                />

                <TextareaField
                  label="Favorite Colors"
                  value={(profile.favorite_colors || []).join(", ")}
                  onChange={(e) => handleArrayChange(e, "favorite_colors")}
                  placeholder="e.g., Blue, Black, White, Red"
                  icon="❤️"
                  hint="Separate multiple colors with commas"
                />

                <TextareaField
                  label="Disliked Colors"
                  value={(profile.disliked_colors || []).join(", ")}
                  onChange={(e) => handleArrayChange(e, "disliked_colors")}
                  placeholder="e.g., Orange, Pink, Yellow"
                  icon="🚫"
                  hint="Separate multiple colors with commas"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                className="px-8 py-6 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <span>💾</span> Save Changes
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
const FormField = ({ label, name, value, onChange, type = "text", placeholder, disabled, icon, note }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <Label className="text-sm font-medium text-slate-600">{label}</Label>
    </div>
    <div className="relative">
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400 ${
          disabled ? 'bg-slate-50 text-slate-500' : ''
        }`}
      />
      {note && (
        <p className="text-xs text-slate-400 mt-1">{note}</p>
      )}
    </div>
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder, icon, hint }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <Label className="text-sm font-medium text-slate-600">{label}</Label>
    </div>
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="min-h-[100px] rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400 resize-y"
    />
    {hint && (
      <p className="text-xs text-slate-400">{hint}</p>
    )}
  </div>
);

export default Profile;