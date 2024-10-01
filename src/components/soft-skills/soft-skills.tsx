import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addSoftSkill, getSoftSkills, deleteSoftSkill } from '@/api/soft-skills-api';

export interface SoftSkillEntry {
  skill: string;
}

export interface SoftSkillEntryWithId extends SoftSkillEntry {
  id: string;
}

export default function SoftSkills() {
  const [skills, setSkills] = useState<SoftSkillEntryWithId[]>([]);
  const [newSkills, setNewSkills] = useState<SoftSkillEntry[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getSoftSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching soft skills:', error);
      }
    };
    fetchSkills();
  }, []);

  const handleSkillChange = (value: string) => {
    setCurrentSkill(value);
  };

  const addSkillToList = () => {
    if (currentSkill.trim()) {
      setNewSkills([...newSkills, { skill: currentSkill.trim() }]);
      setCurrentSkill('');
    }
  };

  const addSkills = async () => {
    if (newSkills.length > 0) {
      try {
        const addedSkills = await addSoftSkill(newSkills);
        setSkills([...skills, ...addedSkills]);
        setNewSkills([]);
      } catch (error) {
        console.error('Error adding soft skills:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSoftSkill(id);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error('Error deleting soft skill:', error);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      await addSkills();
    } catch (error) {
      console.error('Error handling soft skills:', error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center p-5">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Soft Skills</h2>
        <p className="text-sm text-gray-600">Add your soft skills to showcase your personal attributes</p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex space-x-4 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="skill">Soft Skill</Label>
            <Input
              id="skill"
              type="text"
              value={currentSkill}
              onChange={(e) => handleSkillChange(e.target.value)}
              placeholder="e.g., Communication"
            />
          </LabelInputContainer>
          <Button type="button" onClick={addSkillToList} className="mt-auto">
            Add to List
          </Button>
        </div>

        {newSkills.length > 0 && (
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">New Skills to Add</h3>
            <div className="flex flex-wrap gap-2">
              {newSkills.map((skill, index) => (
                <div key={index} className="bg-white px-3 py-1 rounded-full flex items-center">
                  <span>{skill.skill}</span>
                  <button
                    type="button"
                    onClick={() => setNewSkills(newSkills.filter((_, i) => i !== index))}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Your Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white px-3 py-1 rounded-full flex items-center">
                <span>{skill.skill}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(skill.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <ButtonSave isSaving={isSaving} isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
}