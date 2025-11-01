import { useState, useEffect } from "react";
import { Code, Palette, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AboutSection = () => {
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

  const defaultSkills = [
    { icon: <Code className="w-8 h-8" />, title: "Development", description: "Building scalable applications with modern frameworks" },
    { icon: <Palette className="w-8 h-8" />, title: "Design", description: "Creating intuitive user interfaces" },
    { icon: <Rocket className="w-8 h-8" />, title: "Innovation", description: "Staying ahead with cutting-edge technologies" }
  ];

  const skills = profile?.skills?.length > 0 ? profile.skills : defaultSkills;

  return (
    <section id="about" className="min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-8">
          About <span className="text-primary">Me</span>
        </h2>
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
          <p>
            {profile?.about_text || "Hello! I'm a passionate web developer with a love for creating beautiful, functional, and user-centered digital experiences."}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill: any, index: number) => (
            <SkillCard 
              key={index}
              icon={skill.icon || <Code className="w-8 h-8" />}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 group">
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default AboutSection;
