import { Code, Palette, Rocket } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-8">
          About <span className="text-primary">Me</span>
        </h2>
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
          <p>
            Hello! I'm a passionate web developer with a love for creating beautiful, 
            functional, and user-centered digital experiences. With expertise in modern 
            web technologies, I bring ideas to life through clean code and creative solutions.
          </p>
          <p>
            My journey in web development started several years ago, and I've had the 
            privilege of working on diverse projects that have shaped my skills and approach 
            to problem-solving. I believe in continuous learning and staying updated with 
            the latest industry trends.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <SkillCard 
            icon={<Code className="w-8 h-8" />}
            title="Development"
            description="Building scalable applications with modern frameworks and best practices"
          />
          <SkillCard 
            icon={<Palette className="w-8 h-8" />}
            title="Design"
            description="Creating intuitive and visually appealing user interfaces"
          />
          <SkillCard 
            icon={<Rocket className="w-8 h-8" />}
            title="Innovation"
            description="Staying ahead with cutting-edge technologies and approaches"
          />
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
