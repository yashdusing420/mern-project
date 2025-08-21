import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, registerSchema } from "@shared/schema";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register, isLoginPending, isRegisterPending } = useAuth();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      await login(data);
      toast({
        title: "Success",
        description: "Welcome back! You've been logged in successfully.",
      });
      onOpenChange(false);
      loginForm.reset();
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register(data);
      toast({
        title: "Success",
        description: "Account created successfully! Welcome to ServiceHub.",
      });
      onOpenChange(false);
      registerForm.reset();
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to ServiceHub</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoginPending}
              >
                {isLoginPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  placeholder="Choose a username"
                  {...registerForm.register("username")}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-sm text-red-600">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  {...registerForm.register("email")}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-red-600">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  {...registerForm.register("password")}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Phone (Optional)</Label>
                <Input
                  id="register-phone"
                  placeholder="Your phone number"
                  {...registerForm.register("phone")}
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-sm text-red-600">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-address">Address (Optional)</Label>
                <Input
                  id="register-address"
                  placeholder="Your address"
                  {...registerForm.register("address")}
                />
                {registerForm.formState.errors.address && (
                  <p className="text-sm text-red-600">
                    {registerForm.formState.errors.address.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isRegisterPending}
              >
                {isRegisterPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}