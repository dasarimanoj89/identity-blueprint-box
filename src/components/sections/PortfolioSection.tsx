import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PortfolioSection = () => {
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

  const defaultProjects = [
    { title: "E-Commerce Platform", description: "A full-featured online shopping platform", tags: ["React", "Node.js"], link: "#", github: "#" },
    { title: "Portfolio Website", description: "Modern, responsive portfolio website", tags: ["React", "Tailwind CSS"], link: "#", github: "#" }
  ];

  const projects = profile?.projects?.length > 0 ? profile.projects : defaultProjects;
  
  return (
    <section id="portfolio" className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12">
          My <span className="text-primary">Portfolio</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project: any, index: number) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  link, 
  github 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  link: string; 
  github: string;
}) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 group">
    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, idx) => (
        <span 
          key={idx}
          className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
    
    <div className="flex gap-3">
      <a 
        href={link}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        View Project
      </a>
      <a 
        href={github}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Github className="w-4 h-4" />
        Code
      </a>
    </div>
  </div>
);

export default PortfolioSection;
