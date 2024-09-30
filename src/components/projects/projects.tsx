import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addProject, getProjects, updateProjects, deleteProject } from '@/api/projects-api';

export interface ProjectEntry {
  title: string;
  from: string;
  to: string;
  description: string;
  link: string;
}

export interface ProjectEntryWithId extends ProjectEntry {
  id: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectEntryWithId[]>([
    {
      id: '',
      title: '',
      from: '',
      to: '',
      description: '',
      link: '',
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const addProjectEntry = () => {
    setProjects([
      ...projects,
      {
        id: '',
        title: '',
        from: '',
        to: '',
        description: '',
        link: '',
      },
    ]);
  };

  const handleInputChange = (index: number, field: keyof ProjectEntry, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      const existingProjects = await getProjects();
      if (existingProjects.length === 0 || projects.length > existingProjects.length) {
        const newProjects = projects.slice(existingProjects.length);
        if (newProjects.length > 0) {
          await addProject(newProjects);
        }
      } else {
        const updatedProjects = [];
        for (let i = 0; i < projects.length; i++) {
          const updatedProject = projects[i];
          const existingProject = existingProjects[i];
          if (existingProject && JSON.stringify(updatedProject) !== JSON.stringify(existingProject)) {
            updatedProjects.push({ ...updatedProject });
          }
        }
        if (updatedProjects.length > 0) {
          await updateProjects(updatedProjects);
        }
      }
    } catch (error) {
      console.error('Error handling projects:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center py-4">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Projects</h2>
        <p className="text-sm text-gray-600">Add your projects to showcase your skills and achievements</p>
      </div>
      {projects.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <Button type="button" onClick={addProjectEntry} className="">
            + Add Project
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] md:max-h-[100%]">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-4 w-full shadow-md">
              <LabelInputContainer>
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  type="text"
                  required
                  value={project.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`from-${index}`}>From</Label>
                  <Input
                    id={`from-${index}`}
                    type="date"
                    value={project.from ? new Date(project.from).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`to-${index}`}>To</Label>
                  <Input
                    id={`to-${index}`}
                    type="date"
                    value={project.to ? new Date(project.to).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <textarea
                  id={`description-${index}`}
                  className="w-full p-2 border rounded"
                  rows={4}
                  value={project.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor={`link-${index}`}>Link</Label>
                <Input
                  id={`link-${index}`}
                  type="url"
                  value={project.link}
                  onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                />
              </LabelInputContainer>

              <Button 
                type="button"
                onClick={() => handleDelete(project.id)} 
                className="mt-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 ml-4">
            <ButtonSave isSaving={isSaving} isLoading={isLoading} />
            <Button type="button" onClick={addProjectEntry} className="bg-blue-500 hover:bg-blue-600 text-white mr-4">
              Add
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}