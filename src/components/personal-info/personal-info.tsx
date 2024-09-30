import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ImageUploadForm } from "./image-upload";
import { Textarea } from "@nextui-org/input";
import { useAppContext } from "@/context";
import { sendPersonalInfo, getPersonalInfo, updatePersonalInfo } from "../../api/personal-info-api";
import { storeImageData } from "@/firebase/bucket";
import { getUserData } from "../../api/dashboard-api";
import { fetchImageFromBucket } from "@/firebase/bucket";
import { Button } from "../ui/button";
import { ButtonSave } from "../ui/button/button-save";

export interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  aboutMe: string;
  email: string;
  phoneNumber: string;
  linkedin: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  image: string;
}

export interface UserDataWithId {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  aboutMe: string;
  email: string;
  phoneNumber: string;
  linkedin: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  image: any;
}

export default function PersonalInfo() {
  const [data, setData] = useState<UserData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    aboutMe: "",
    email: "",
    phoneNumber: "",
    linkedin: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    image: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const { image, setImage } = useAppContext();
  data.image = image;

  useEffect(() => {
    async function fetchUserInfo() {
      setIsLoading(true);
      if (await getPersonalInfo()) {
        const userData: UserData = await getPersonalInfo();
        const res = await getUserDataResult();
        setUserId(res?.data.id);
        const imageURL = await fetchImageFromBucket(res?.data.id);
        setImage(imageURL);
        setData((prev) => ({ ...prev, ...userData }));
      }
      setIsLoading(false);
    }
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await getUserDataResult();
      if (typeof data.image === 'object' && data.image !== null) {
        const snapshot = await storeImageData(res?.data.id, data.image);
        data.image = await snapshot.ref.fullPath;
      }
      
      const existingData = await getPersonalInfo();
      if (existingData) {
        await updatePersonalInfo(data);
      } else {
        await sendPersonalInfo(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  const SkeletonInput = () => (
    <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
  );

  return (
    <form className="mb-4 overflow-y-auto max-h-[calc(100vh-5%)] md:max-h-[100%]" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row md:space-x-2 p-5 gap-4 md:gap-32">
      <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-bold mb-2">Personal Information</h1>
          <p className="text-gray-600 max-w-md text-sm">
            Please fill out the form below with your personal details. This information will be used to create your profile.
          </p>
        </div>
        <div className="flex-shrink-0">
          {isLoading ? (
            <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full"></div>
          ) : (
            <ImageUploadForm userId={userId || ""} />
          )}
        </div>

      </div>

      <div className="flex flex-col md:flex-row md:space-x-2  px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname" className="">
            First name
          </Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              required
              value={data.firstName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="lastname">Last name</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              required
              value={data.lastName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2  px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="date">Date of birth</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="date"
              type="date"
              value={
                data.dateOfBirth
                  ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="phone"
              placeholder="+12345678"
              type="text"
              value={data.phoneNumber}
              onChange={(e) =>
                setData((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="linkedin">Linkedin</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="linkedin"
              placeholder="Handle"
              type="text"
              value={data.linkedin}
              onChange={(e) =>
                setData((prev) => ({ ...prev, linkedin: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="website">Website</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="website"
              placeholder="www.abc.com"
              type="text"
              value={data.website}
              onChange={(e) =>
                setData((prev) => ({ ...prev, website: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 mb-4 px-5 max-w-4xl">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address1">Address Line 1</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="address1"
              placeholder="32 XYZ Street"
              type="text"
              value={data.addressLine1}
              onChange={(e) =>
                setData((prev) => ({ ...prev, addressLine1: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="city">City</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="city"
              placeholder="Addis"
              type="text"
              value={data.city}
              onChange={(e) =>
                setData((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="country">Country</Label>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <Input
              id="country"
              placeholder="Kosovo"
              type="text"
              value={data.country}
              onChange={(e) =>
                setData((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          )}
        </LabelInputContainer>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-2 mb-4 px-5 max-w-4xl">
        {isLoading ? (
          <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <Textarea
            variant="flat"
            label="About me"
            placeholder=""
            className="max-w-5xl bg-white text-sm font-medium"
            value={data.aboutMe}
            onChange={(e) => {
              setData((prev) => ({ ...prev, aboutMe: e.target.value }));
            }}
          />
        )}
      </div>

        <ButtonSave isSaving={isSaving} isLoading={isLoading} />
    </form>
  );
}

async function getUserDataResult() {
  return await getUserData();
}

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
