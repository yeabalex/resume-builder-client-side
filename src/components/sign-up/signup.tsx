'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"



const validateFirstName = (value: any) => /^[A-Za-z\s]+$/.test(value) ? '' : "First name can't be empty";
const validateLastName = (value: any) => /^[A-Za-z\s]+$/.test(value) ? '' : "Last name can't be empty";
const validateEmail = (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
const validatePassword = (value: any) => {
  if (!value) return "Password can't be empty";
  if (value.length < 8) return 'Password must be at least 8 characters long';
  if (!/\d/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one number and one special symbol';
  return '';
};

export function SignUp() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [newErrors, setNewErrors] = useState({firstName: '', lastName: '', email: '', password: ''})

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  useEffect(()=>{
    setNewErrors( {
        firstName: validateFirstName(formData.firstName),
        lastName: validateLastName(formData.lastName),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
      })
  },[formData])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();



    if (Object.values(newErrors).every(error => error === '')) {
      
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full h-[100vh] flex justify-center items-center px-8 ${!isSmallScreen ? "pt-16" : ""}`}>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Create an account</CardTitle>
              <CardDescription className="text-white">
                Already have an account? <Link href='/log-in' className="text-blue-400">Click here to log in</Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Martin"
                  className={`bg-white ${errors.firstName ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="text-red-500">{errors.firstName}</div>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Garrix"
                  className={`bg-white ${errors.lastName ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  placeholder="maria@savage.de"
                  className={`bg-white ${errors.email ? 'border-red-500' : ''}`}
                  onChange={handleChange}
                />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Button
                  hidden
                  className="w-0 h-0 absolute top-[40px] right-2 z-50"
                  onClick={togglePassword}
                  variant="secondary"
                >
                  {!showPassword ?
                    <FontAwesomeIcon icon={faEye} style={{ color: "#000" }} className="" /> :
                    <FontAwesomeIcon icon={faEyeSlash} style={{ color: "#000" }} className="" />
                  }
                </Button>
                <Input
                  id="password"
                  className={`bg-white ${errors.password ? 'border-red-500' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                />
                {errors.password && <div className="text-red-500">{errors.password}</div>}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-white" type="submit">Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
