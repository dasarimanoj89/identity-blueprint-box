import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    <section id="contact" className="min-h-screen p-12 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-12">
          Get In <span className="text-primary">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's work together</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-4">
              <ContactInfo 
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                value="hello@example.com"
              />
              <ContactInfo 
                icon={<MessageSquare className="w-5 h-5" />}
                title="Response Time"
                value="Within 24 hours"
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input 
                placeholder="Your Name"
                className="bg-card border-border"
              />
            </div>
            <div>
              <Input 
                type="email"
                placeholder="Your Email"
                className="bg-card border-border"
              />
            </div>
            <div>
              <Input 
                placeholder="Subject"
                className="bg-card border-border"
              />
            </div>
            <div>
              <Textarea 
                placeholder="Your Message"
                rows={6}
                className="bg-card border-border resize-none"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  </div>
);

export default ContactSection;
