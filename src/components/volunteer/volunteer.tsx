import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addVolunteer, getVolunteer, updateVolunteer, deleteVolunteer } from '@/api/volunteer-api';

export interface VolunteerEntry {
  organization: string;
  role: string;
  description: string;
  from: string;
  to: string;
}

export interface VolunteerEntryWithId extends VolunteerEntry {
  id: string;
}

export default function Volunteer() {
  const [volunteers, setVolunteers] = useState<VolunteerEntryWithId[]>([
    {
      id: '',
      organization: '',
      role: '',
      description: '',
      from: '',
      to: '',
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const fetchedVolunteers = await getVolunteer();
        setVolunteers(fetchedVolunteers);
      } catch (error) {
        console.error('Error fetching volunteer experiences:', error);
      }
    };
    fetchVolunteers();
  }, []);

  const addVolunteerEntry = () => {
    setVolunteers([
      ...volunteers,
      {
        id: '',
        organization: '',
        role: '',
        description: '',
        from: '',
        to: '',
      },
    ]);
  };

  const handleInputChange = (index: number, field: keyof VolunteerEntry, value: string) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers[index][field] = value;
    setVolunteers(updatedVolunteers);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      const existingVolunteers = await getVolunteer();
      if (existingVolunteers.length === 0 || volunteers.length > existingVolunteers.length) {
        const newVolunteers = volunteers.slice(existingVolunteers.length);
        if (newVolunteers.length > 0) {
          await addVolunteer(newVolunteers);
        }
      } else {
        const updatedVolunteers = [];
        for (let i = 0; i < volunteers.length; i++) {
          const updatedVolunteer = volunteers[i];
          const existingVolunteer = existingVolunteers[i];
          if (existingVolunteer && JSON.stringify(updatedVolunteer) !== JSON.stringify(existingVolunteer)) {
            updatedVolunteers.push({ ...updatedVolunteer });
          }
        }
        if (updatedVolunteers.length > 0) {
          await updateVolunteer(updatedVolunteers);
        }
      }
    } catch (error) {
      console.error('Error handling volunteer experiences:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteVolunteer(id);
      setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
    } catch (error) {
      console.error('Error deleting volunteer experience:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center p-2">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Volunteer Experience</h2>
        <p className="text-sm text-gray-600">Add your volunteer experiences to showcase your community involvement</p>
      </div>
      {volunteers.length === 0 ? (
        <div className="flex items-center justify-center">
          <Button type="button" onClick={addVolunteerEntry} className="">
            + Add Volunteer Experience
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] md:max-h-[100%] p-3">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="bg-gray-100 rounded-lg space-y-4 w-full shadow-md">
              <LabelInputContainer>
                <Label htmlFor={`organization-${index}`}>Organization</Label>
                <Input
                  id={`organization-${index}`}
                  type="text"
                  required
                  value={volunteer.organization}
                  onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor={`role-${index}`}>Role</Label>
                <Input
                  id={`role-${index}`}
                  type="text"
                  required
                  value={volunteer.role}
                  onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor={`description-${index}`}>Description</Label>
                <textarea
                  id={`description-${index}`}
                  className="w-full p-2 border rounded"
                  rows={4}
                  value={volunteer.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`from-${index}`}>From</Label>
                  <Input
                    id={`from-${index}`}
                    type="date"
                    value={volunteer.from ? new Date(volunteer.from).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`to-${index}`}>To</Label>
                  <Input
                    id={`to-${index}`}
                    type="date"
                    value={volunteer.to ? new Date(volunteer.to).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <Button 
                type="button"
                onClick={() => handleDelete(volunteer.id)} 
                className="mt-2 mb-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <ButtonSave isSaving={isSaving} isLoading={isLoading}/>
            <Button type="button" onClick={addVolunteerEntry} className="bg-blue-500 hover:bg-blue-600 text-white mr-4">
              Add
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}