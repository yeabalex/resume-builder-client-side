import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addEducation, getEducation, updateEducation, deleteEducation } from '@/api/education-api';

export interface EducationEntry {
  credential: string;
  organization: string;
  city: string;
  country: string;
  from: string;
  to: string;
}

export interface EducationEntryWithId extends EducationEntry {
  id: string;
}

export default function Education() {
  const [educations, setEducations] = useState<EducationEntryWithId[]>([
    {
      id: '',
      credential: '',
      organization: '',
      city: '',
      country: '',
      from: '',
      to: '',
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const fetchedEducations = await getEducation();
        setEducations(fetchedEducations);
      } catch (error) {
        console.error('Error fetching education:', error);
      }
    };
    fetchEducation();
  }, []);

  const addEducationEntry = () => {
    setEducations([
      ...educations,
      {
        id: '',
        credential: '',
        organization: '',
        city: '',
        country: '',
        from: '',
        to: '',
      },
    ]);
  };

  const handleInputChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      const existingEducations = await getEducation();
      if (existingEducations.length === 0 || educations.length > existingEducations.length) {
        const newEducations = educations.slice(existingEducations.length);
        if (newEducations.length > 0) {
          await addEducation(newEducations);
        }
      } else {
        const updatedEducations = [];
        for (let i = 0; i < educations.length; i++) {
          const updatedEducation = educations[i];
          const existingEducation = existingEducations[i];
          if (existingEducation && JSON.stringify(updatedEducation) !== JSON.stringify(existingEducation)) {
            updatedEducations.push({ ...updatedEducation });
          }
        }
        if (updatedEducations.length > 0) {
          await updateEducation(updatedEducations);
        }
      }
    } catch (error) {
      console.error('Error handling educations:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEducation(id);
      setEducations(educations.filter((education) => education.id !== id));
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center py-4">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Education</h2>
        <p className="text-sm text-gray-600">Add your educational background to showcase your academic achievements</p>
      </div>
      {educations.length === 0 ? (
        <div className="flex items-center justify-center">
          <Button type="button" onClick={addEducationEntry} className="">
            + Add Education
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] md:max-h-[100%]">
          {educations.map((education, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-4 w-full shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`credential-${index}`}>Credential</Label>
                  <Input
                    id={`credential-${index}`}
                    type="text"
                    required
                    value={education.credential}
                    onChange={(e) => handleInputChange(index, 'credential', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`organization-${index}`}>Organization</Label>
                  <Input
                    id={`organization-${index}`}
                    type="text"
                    required
                    value={education.organization}
                    onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`city-${index}`}>City</Label>
                  <Input
                    id={`city-${index}`}
                    type="text"
                    value={education.city}
                    onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`country-${index}`}>Country</Label>
                  <Input
                    id={`country-${index}`}
                    type="text"
                    value={education.country}
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
                    value={education.from ? new Date(education.from).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`to-${index}`}>To</Label>
                  <Input
                    id={`to-${index}`}
                    type="date"
                    value={education.to ? new Date(education.to).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <Button 
                type="button"
                onClick={() => handleDelete(education.id)} 
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
            <Button type="button" onClick={addEducationEntry} className="bg-blue-500 hover:bg-blue-600 text-white mr-4">
              Add
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
