import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";
const Sidebar = () => {
  return <aside className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-8 border-b border-border">
        <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 bg-secondary mx-auto">
          <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-foreground text-center mb-1">Dasari Manoj</h1>
        <p className="text-muted-foreground text-center text-sm">Web Developer</p>
      </div>
      
      <div className="flex-1 p-8 space-y-6">
        <div className="space-y-4">
          <ContactItem icon={<Mail className="w-4 h-4" />} label="Email" value="hello@example.com" />
          <ContactItem icon={<Phone className="w-4 h-4" />} label="Phone" value="+1 (555) 123-4567" />
          <ContactItem icon={<Calendar className="w-4 h-4" />} label="Birthday" value="January 1, 1990" />
          <ContactItem icon={<MapPin className="w-4 h-4" />} label="Location" value="California, USA" />
        </div>
        
        <div className="flex gap-4 pt-4 justify-center">
          <SocialIcon icon={<Github className="w-5 h-5" />} href="#" />
          <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" />
          <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
        </div>
      </div>
    </aside>;
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