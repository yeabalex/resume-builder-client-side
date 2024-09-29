import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { addWorkExperience } from '@/api/work-experience-api';

export interface WorkExperienceEntry {
  position: string;
  company: string;
  city: string;
  country: string;
  from: string;
  to: string;
  description: string;
}

export default function WorkExperience() {
  const [experiences, setExperiences] = useState<WorkExperienceEntry[]>([
    {
      position: '',
      company: '',
      city: '',
      country: '',
      from: '',
      to: '',
      description: '',
    },
  ]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        position: '',
        company: '',
        city: '',
        country: '',
        from: '',
        to: '',
        description: '',
      },
    ]);
  };

  const handleInputChange = (index: number, field: keyof WorkExperienceEntry, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center py-4">
      {experiences.length === 0 ? (
        <div className="flex items-center justify-center">
          <Button onClick={addExperience} className="">
            + Add Work Experience
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] md:max-h-[100%]">
          {experiences.map((experience, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-4 w-full">
              <LabelInputContainer>
                <Label htmlFor={`position-${index}`}>Position</Label>
                <Input
                  id={`position-${index}`}
                  type="text"
                  required
                  value={experience.position}
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  type="text"
                  required
                  value={experience.company}
                  onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`city-${index}`}>City</Label>
                  <Input
                    id={`city-${index}`}
                    type="text"
                    value={experience.city}
                    onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`country-${index}`}>Country</Label>
                  <Input
                    id={`country-${index}`}
                    type="text"
                    value={experience.country}
                    onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`from-${index}`}>From</Label>
                  <Input
                    id={`from-${index}`}
                    type="date"
                    value={experience.from}
                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`to-${index}`}>To</Label>
                  <Input
                    id={`to-${index}`}
                    type="date"
                    value={experience.to}
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
                  value={experience.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </LabelInputContainer>
              <Button 
                onClick={() => {
                  const updatedExperiences = experiences.filter((_, i) => i !== index);
                  setExperiences(updatedExperiences);
                }} 
                className="mt-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 ml-4">
            <Button onClick={() => {/* Add save functionality here */}} className="bg-neutral-800 hover:bg-neutral-900 text-white w-24 h-10 rounded-md">
              Save
            </Button>
            <Button onClick={addExperience} className="bg-blue-500 hover:bg-blue-600 text-white mr-4">
             Add 
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}