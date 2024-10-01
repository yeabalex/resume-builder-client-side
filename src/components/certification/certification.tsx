import React, { FormEvent, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/personal-info/personal-info';
import { Button } from '@/components/ui/button';
import { ButtonSave } from '@/components/ui/button/button-save';
import { addCertification, getCertifications, updateCertifications, deleteCertification } from '@/api/certifications-api';

export interface CertificationEntry {
  name: string;
  from: string;
  to: string;
  link: string;
}

export interface CertificationEntryWithId extends CertificationEntry {
  id: string;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<CertificationEntryWithId[]>([
    {
      id: '',
      name: '',
      from: '',
      to: '',
      link: '',
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const fetchedCertifications = await getCertifications();
        setCertifications(fetchedCertifications);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };
    fetchCertifications();
  }, []);

  const addCertificationEntry = () => {
    setCertifications([
      ...certifications,
      {
        id: '',
        name: '',
        from: '',
        to: '',
        link: '',
      },
    ]);
  };

  const handleInputChange = (index: number, field: keyof CertificationEntry, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSaving(true);
    try {
      const existingCertifications = await getCertifications();
      if (existingCertifications.length === 0 || certifications.length > existingCertifications.length) {
        const newCertifications = certifications.slice(existingCertifications.length);
        if (newCertifications.length > 0) {
          await addCertification(newCertifications);
        }
      } else {
        const updatedCertifications = [];
        for (let i = 0; i < certifications.length; i++) {
          const updatedCertification = certifications[i];
          const existingCertification = existingCertifications[i];
          if (existingCertification && JSON.stringify(updatedCertification) !== JSON.stringify(existingCertification)) {
            updatedCertifications.push({ ...updatedCertification });
          }
        }
        if (updatedCertifications.length > 0) {
          await updateCertifications(updatedCertifications);
        }
      }
    } catch (error) {
      console.error('Error handling certifications:', error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCertification(id);
      setCertifications(certifications.filter((certification) => certification.id !== id));
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center justify-center p-2">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Certifications</h2>
        <p className="text-sm text-gray-600">Add your certifications to showcase your skills and achievements</p>
      </div>
      {certifications.length === 0 ? (
        <div className="flex items-center justify-center">
          <Button type="button" onClick={addCertificationEntry} className="">
            + Add Certification
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)] md:max-h-[100%] p-3">
          {certifications.map((certification, index) => (
            <div key={index} className="bg-gray-100 rounded-lg space-y-4 w-full shadow-md">
              <LabelInputContainer>
                <Label htmlFor={`name-${index}`}>Name</Label>
                <Input
                  id={`name-${index}`}
                  type="text"
                  required
                  value={certification.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor={`from-${index}`}>From</Label>
                  <Input
                    id={`from-${index}`}
                    type="date"
                    value={certification.from ? new Date(certification.from).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'from', e.target.value)}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor={`to-${index}`}>To</Label>
                  <Input
                    id={`to-${index}`}
                    type="date"
                    value={certification.to ? new Date(certification.to).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange(index, 'to', e.target.value)}
                  />
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <Label htmlFor={`link-${index}`}>Link</Label>
                <Input
                  id={`link-${index}`}
                  type="url"
                  value={certification.link}
                  onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                />
              </LabelInputContainer>

              <Button 
                type="button"
                onClick={() => handleDelete(certification.id)} 
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
            <Button type="button" onClick={addCertificationEntry} className="bg-blue-500 hover:bg-blue-600 text-white mr-4">
              Add
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}