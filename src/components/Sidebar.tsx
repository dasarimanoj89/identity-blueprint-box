import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import profileAvatar from "@/assets/profile-avatar.jpg";

const Sidebar = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-8 border-b border-border">
        <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 bg-secondary mx-auto">
          <img 
            src={profile?.avatar_url || profileAvatar} 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        <h1 className="text-2xl font-bold text-foreground text-center mb-1">
          {profile?.full_name || "Your Name"}
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          {profile?.job_title || "Web Developer"}
        </p>
      </div>
      
      <div className="flex-1 p-8 space-y-6">
        <div className="space-y-4">
          <ContactItem 
            icon={<Mail className="w-4 h-4" />} 
            label="Email" 
            value={profile?.email || "your@email.com"} 
          />
          <ContactItem 
            icon={<Phone className="w-4 h-4" />} 
            label="Phone" 
            value={profile?.phone || "+1 (555) 123-4567"} 
          />
          <ContactItem 
            icon={<Calendar className="w-4 h-4" />} 
            label="Birthday" 
            value={profile?.birthday || "January 1, 1990"} 
          />
          <ContactItem 
            icon={<MapPin className="w-4 h-4" />} 
            label="Location" 
            value={profile?.location || "Your Location"} 
          />
        </div>
        
        <div className="flex gap-4 pt-4 justify-center">
          {profile?.github_url && (
            <SocialIcon icon={<Github className="w-5 h-5" />} href={profile.github_url} />
          )}
          {profile?.linkedin_url && (
            <SocialIcon icon={<Linkedin className="w-5 h-5" />} href={profile.linkedin_url} />
          )}
          {profile?.twitter_url && (
            <SocialIcon icon={<Twitter className="w-5 h-5" />} href={profile.twitter_url} />
          )}
        </div>
      </div>
    </aside>
  );
};
const ContactItem = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-foreground break-words">{value}</p>
    </div>
  </div>;
const SocialIcon = ({
  icon,
  href
}: {
  icon: React.ReactNode;
  href: string;
}) => <a href={href} className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center text-muted-foreground">
    {icon}
  </a>;
export default Sidebar;