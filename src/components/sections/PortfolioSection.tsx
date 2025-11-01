import { ExternalLink, Github } from "lucide-react";

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with payment integration, inventory management, and user authentication.",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      github: "#"
    },
    {
      title: "Project Management Tool",
      description: "Collaborative project management application with real-time updates, task tracking, and team communication.",
      tags: ["TypeScript", "React", "Firebase"],
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website with smooth animations and optimized performance.",
      tags: ["React", "Tailwind CSS", "Vite"],
      link: "#",
      github: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with forecasts, location search, and interactive maps.",
      tags: ["React", "API Integration", "Charts"],
      link: "#",
      github: "#"
    },
  ];
  
  return (
    <section id="portfolio" className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12">
          My <span className="text-primary">Portfolio</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
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
