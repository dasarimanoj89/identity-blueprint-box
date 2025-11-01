import { useState, useEffect } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ResumeSection = () => {
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

  const defaultEducation = [
    { title: "Bachelor of Computer Science", institution: "University of Technology", period: "2015 - 2019", description: "Focused on software engineering" }
  ];

  const defaultExperience = [
    { title: "Senior Frontend Developer", institution: "Tech Solutions Inc.", period: "2021 - Present", description: "Leading development of modern web applications" }
  ];

  const education = profile?.education?.length > 0 ? profile.education : defaultEducation;
  const experience = profile?.experience?.length > 0 ? profile.experience : defaultExperience;

  return (
    <section id="resume" className="min-h-screen p-12 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-12">
          My <span className="text-primary">Resume</span>
        </h2>
        
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((item: any, index: number) => (
                <ResumeItem key={index} {...item} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Experience</h3>
            </div>
            
            <div className="space-y-6">
              {experience.map((item: any, index: number) => (
                <ResumeItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResumeItem = ({ 
  title, 
  institution, 
  period, 
  description 
}: { 
  title: string; 
  institution: string; 
  period: string; 
  description: string;
}) => (
  <div className="relative pl-8 pb-8 border-l-2 border-border last:pb-0">
    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h4 className="text-xl font-semibold">{title}</h4>
        <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
          {period}
        </span>
      </div>
      <p className="text-muted-foreground font-medium">{institution}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default ResumeSection;
