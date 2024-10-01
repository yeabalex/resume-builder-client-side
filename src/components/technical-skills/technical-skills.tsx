import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addTechnicalSkill, getTechnicalSkills, updateTechnicalSkills, deleteTechnicalSkill } from '@/api/technical-skills-api';

export interface TechnicalSkillEntry {
  group: string;
  skill: string;
}

export interface TechnicalSkillEntryWithId extends TechnicalSkillEntry {
  id: string;
}

const predefinedGroups = [
  'Programming Languages',
  'Web Technologies',
  'Databases',
  'Cloud Platforms',
  'DevOps Tools',
  'Mobile Development',
  'Machine Learning',
  'Data Analysis',
  'Version Control',
  'Other'
];

export default function TechnicalSkills() {
  const [skills, setSkills] = useState<TechnicalSkillEntryWithId[]>([]);
  const [newSkills, setNewSkills] = useState<TechnicalSkillEntry[]>([]);
  const [currentGroup, setCurrentGroup] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>(predefinedGroups);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getTechnicalSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching technical skills:', error);
      }
    };
    fetchSkills();
  }, []);

  const handleGroupChange = (value: string) => {
    setCurrentGroup(value);
  };

  const handleSkillChange = (value: string) => {
    setCurrentSkill(value);
  };

  const addSkillToList = () => {
    if (currentGroup && currentSkill) {
      setNewSkills([...newSkills, { group: currentGroup, skill: currentSkill }]);
      setCurrentSkill('');
    }
  };

  const addSkills = async () => {
    if (newSkills.length > 0) {
      try {
        console.log('Adding skills:', newSkills);
        const addedSkills = await addTechnicalSkill(newSkills);
        setSkills([...skills, ...addedSkills]);
        setNewSkills([]);
        setCurrentGroup('');
        setCurrentSkill('');
      } catch (error) {
        console.error('Error adding technical skills:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTechnicalSkill(id);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error('Error deleting technical skill:', error);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      await addSkills();
    } catch (error) {
      console.error('Error handling technical skills:', error);
    } finally {
      setIsSaving(false);
    }
  }

  // Group skills by their group
  const groupedSkills = [...skills, ...newSkills].reduce((acc, skill) => {
    if (!acc[skill.group]) {
      acc[skill.group] = [];
    }
    acc[skill.group].push(skill);
    return acc;
  }, {} as Record<string, (TechnicalSkillEntryWithId | TechnicalSkillEntry)[]>);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center p-5">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Technical Skills</h2>
        <p className="text-sm text-gray-600">Add your technical skills grouped by category</p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex space-x-4 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="group">Skill Group</Label>
            <select
              id="group"
              value={currentGroup}
              onChange={(e) => handleGroupChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="skill">Skill</Label>
            <Input
              id="skill"
              type="text"
              value={currentSkill}
              onChange={(e) => handleSkillChange(e.target.value)}
              placeholder="e.g., JavaScript"
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
                  <span>{skill.group}: {skill.skill}</span>
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

        {Object.entries(groupedSkills).map(([group, groupSkills]) => (
          <div key={group} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {groupSkills.map((skill, index) => (
                <div key={'id' in skill ? skill.id : index} className="bg-white px-3 py-1 rounded-full flex items-center">
                  <span>{skill.skill}</span>
                  {'id' in skill && (
                    <button
                      type="button"
                      onClick={() => handleDelete(skill.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <ButtonSave isSaving={isSaving} isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
}