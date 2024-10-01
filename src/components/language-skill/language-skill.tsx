import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addLanguageSkill, getLanguageSkills, deleteLanguageSkill } from '@/api/language-skills-api';

export interface LanguageSkillEntry {
  langName: string;
  proficiency: string;
}

export interface LanguageSkillEntryWithId extends LanguageSkillEntry {
  id: string;
}

const proficiencyLevels = [
  { value: 'A1', label: 'A1 - Beginner (Can understand and use basic phrases, introduce self)' },
  { value: 'A2', label: 'A2 - Elementary (Can describe immediate environment, communicate in simple tasks)' },
  { value: 'B1', label: 'B1 - Intermediate (Can deal with most situations while traveling, describe experiences)' },
  { value: 'B2', label: 'B2 - Upper Intermediate (Can interact fluently, explain viewpoints on topical issues)' },
  { value: 'C1', label: 'C1 - Advanced (Can use language flexibly for social, academic and professional purposes)' },
  { value: 'C2', label: 'C2 - Proficient (Can understand with ease virtually everything heard or read)' },
  { value: 'Native', label: 'Native (Native speaker)' },
];

export default function LanguageSkills() {
  const [skills, setSkills] = useState<LanguageSkillEntryWithId[]>([]);
  const [newSkills, setNewSkills] = useState<LanguageSkillEntry[]>([]);
  const [currentSkill, setCurrentSkill] = useState<LanguageSkillEntry>({ langName: '', proficiency: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getLanguageSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching language skills:', error);
      }
    };
    fetchSkills();
  }, []);

  const handleInputChange = (field: keyof LanguageSkillEntry, value: string) => {
    setCurrentSkill({ ...currentSkill, [field]: value });
  };

  const addSkillToList = () => {
    if (currentSkill.langName && currentSkill.proficiency) {
      setNewSkills([...newSkills, currentSkill]);
      setCurrentSkill({ langName: '', proficiency: '' });
    }
  };

  const addSkills = async () => {
    if (newSkills.length > 0) {
      try {
        const addedSkills = await addLanguageSkill(newSkills);
        setSkills([...skills, ...addedSkills]);
        setNewSkills([]);
      } catch (error) {
        console.error('Error adding language skills:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLanguageSkill(id);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error('Error deleting language skill:', error);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      await addSkills();
    } catch (error) {
      console.error('Error handling language skills:', error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center p-5">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Language Skills</h2>
        <p className="text-sm text-gray-600">Add your language skills and proficiency levels</p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex space-x-4 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="proficiency">Proficiency</Label>
            <select
              id="proficiency"
              value={currentSkill.proficiency}
              onChange={(e) => handleInputChange('proficiency', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select proficiency</option>
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="langName">Language</Label>
            <Input
              id="langName"
              type="text"
              value={currentSkill.langName}
              onChange={(e) => handleInputChange('langName', e.target.value)}
              placeholder="e.g., English"
            />
          </LabelInputContainer>
          <Button type="button" onClick={addSkillToList} className="mt-auto">
            Add to List
          </Button>
        </div>

        {newSkills.length > 0 && (
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">New Skills to Add</h3>
            <div className="space-y-2">
              {newSkills.map((skill, index) => (
                <div key={index} className="bg-white p-2 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{skill.langName}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      {proficiencyLevels.find((level) => level.value === skill.proficiency)?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNewSkills(newSkills.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Your Language Skills</h3>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white p-2 rounded-lg flex items-center justify-between">
                <span className="font-medium">{skill.langName}</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">
                    {proficiencyLevels.find((level) => level.value === skill.proficiency)?.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
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