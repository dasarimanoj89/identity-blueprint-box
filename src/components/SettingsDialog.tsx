import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (open) {
      loadProfile();
    }
  }, [open]);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      setProfile(data || {
        full_name: "",
        job_title: "Web Developer",
        email: "",
        phone: "",
        birthday: "",
        location: "",
        bio: "",
        avatar_url: "",
        github_url: "",
        linkedin_url: "",
        twitter_url: "",
        about_text: "",
        skills: [],
        education: [],
        experience: [],
        projects: []
      });
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({ title: "Error loading profile", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({ title: "Profile updated successfully!" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({ title: "Error saving profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Job Title</Label>
                <Input
                  value={profile.job_title || ""}
                  onChange={(e) => setProfile({ ...profile, job_title: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Birthday</Label>
                <Input
                  value={profile.birthday || ""}
                  onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
              <div>
                <Label>Avatar URL</Label>
                <Input
                  value={profile.avatar_url || ""}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>GitHub URL</Label>
                <Input
                  value={profile.github_url || ""}
                  onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={profile.linkedin_url || ""}
                  onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Twitter URL</Label>
                <Input
                  value={profile.twitter_url || ""}
                  onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <div>
              <Label>About Text</Label>
              <Textarea
                rows={6}
                value={profile.about_text || ""}
                onChange={(e) => setProfile({ ...profile, about_text: e.target.value })}
                placeholder="Write about yourself..."
              />
            </div>
            <div>
              <Label>Skills</Label>
              {(profile.skills || []).map((skill: any, idx: number) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Title"
                    value={skill.title || ""}
                    onChange={(e) => {
                      const newSkills = [...profile.skills];
                      newSkills[idx] = { ...skill, title: e.target.value };
                      setProfile({ ...profile, skills: newSkills });
                    }}
                  />
                  <Input
                    placeholder="Description"
                    value={skill.description || ""}
                    onChange={(e) => {
                      const newSkills = [...profile.skills];
                      newSkills[idx] = { ...skill, description: e.target.value };
                      setProfile({ ...profile, skills: newSkills });
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const newSkills = profile.skills.filter((_: any, i: number) => i !== idx);
                      setProfile({ ...profile, skills: newSkills });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setProfile({
                    ...profile,
                    skills: [...(profile.skills || []), { title: "", description: "" }]
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resume" className="space-y-4">
            <div>
              <Label>Education</Label>
              {(profile.education || []).map((edu: any, idx: number) => (
                <div key={idx} className="space-y-2 mb-4 p-4 border rounded">
                  <Input
                    placeholder="Title"
                    value={edu.title || ""}
                    onChange={(e) => {
                      const newEdu = [...profile.education];
                      newEdu[idx] = { ...edu, title: e.target.value };
                      setProfile({ ...profile, education: newEdu });
                    }}
                  />
                  <Input
                    placeholder="Institution"
                    value={edu.institution || ""}
                    onChange={(e) => {
                      const newEdu = [...profile.education];
                      newEdu[idx] = { ...edu, institution: e.target.value };
                      setProfile({ ...profile, education: newEdu });
                    }}
                  />
                  <Input
                    placeholder="Period"
                    value={edu.period || ""}
                    onChange={(e) => {
                      const newEdu = [...profile.education];
                      newEdu[idx] = { ...edu, period: e.target.value };
                      setProfile({ ...profile, education: newEdu });
                    }}
                  />
                  <Textarea
                    placeholder="Description"
                    value={edu.description || ""}
                    onChange={(e) => {
                      const newEdu = [...profile.education];
                      newEdu[idx] = { ...edu, description: e.target.value };
                      setProfile({ ...profile, education: newEdu });
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newEdu = profile.education.filter((_: any, i: number) => i !== idx);
                      setProfile({ ...profile, education: newEdu });
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setProfile({
                    ...profile,
                    education: [...(profile.education || []), { title: "", institution: "", period: "", description: "" }]
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>

            <div>
              <Label>Experience</Label>
              {(profile.experience || []).map((exp: any, idx: number) => (
                <div key={idx} className="space-y-2 mb-4 p-4 border rounded">
                  <Input
                    placeholder="Title"
                    value={exp.title || ""}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx] = { ...exp, title: e.target.value };
                      setProfile({ ...profile, experience: newExp });
                    }}
                  />
                  <Input
                    placeholder="Institution"
                    value={exp.institution || ""}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx] = { ...exp, institution: e.target.value };
                      setProfile({ ...profile, experience: newExp });
                    }}
                  />
                  <Input
                    placeholder="Period"
                    value={exp.period || ""}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx] = { ...exp, period: e.target.value };
                      setProfile({ ...profile, experience: newExp });
                    }}
                  />
                  <Textarea
                    placeholder="Description"
                    value={exp.description || ""}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx] = { ...exp, description: e.target.value };
                      setProfile({ ...profile, experience: newExp });
                    }}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newExp = profile.experience.filter((_: any, i: number) => i !== idx);
                      setProfile({ ...profile, experience: newExp });
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setProfile({
                    ...profile,
                    experience: [...(profile.experience || []), { title: "", institution: "", period: "", description: "" }]
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Label>Projects</Label>
            {(profile.projects || []).map((project: any, idx: number) => (
              <div key={idx} className="space-y-2 mb-4 p-4 border rounded">
                <Input
                  placeholder="Title"
                  value={project.title || ""}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[idx] = { ...project, title: e.target.value };
                    setProfile({ ...profile, projects: newProjects });
                  }}
                />
                <Textarea
                  placeholder="Description"
                  value={project.description || ""}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[idx] = { ...project, description: e.target.value };
                    setProfile({ ...profile, projects: newProjects });
                  }}
                />
                <Input
                  placeholder="Tags (comma-separated)"
                  value={(project.tags || []).join(", ")}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[idx] = { ...project, tags: e.target.value.split(",").map((t: string) => t.trim()) };
                    setProfile({ ...profile, projects: newProjects });
                  }}
                />
                <Input
                  placeholder="Project Link"
                  value={project.link || ""}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[idx] = { ...project, link: e.target.value };
                    setProfile({ ...profile, projects: newProjects });
                  }}
                />
                <Input
                  placeholder="GitHub Link"
                  value={project.github || ""}
                  onChange={(e) => {
                    const newProjects = [...profile.projects];
                    newProjects[idx] = { ...project, github: e.target.value };
                    setProfile({ ...profile, projects: newProjects });
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newProjects = profile.projects.filter((_: any, i: number) => i !== idx);
                    setProfile({ ...profile, projects: newProjects });
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                setProfile({
                  ...profile,
                  projects: [...(profile.projects || []), { title: "", description: "", tags: [], link: "", github: "" }]
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};