import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      toast.success("Thank you! I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
          className="bg-input/50 text-foreground placeholder:text-muted-foreground border-border focus:border-primary transition-colors duration-200"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
          className="bg-input/50 text-foreground placeholder:text-muted-foreground border-border focus:border-primary transition-colors duration-200"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="How can we work together?"
          rows={5}
          className="bg-input/50 text-foreground placeholder:text-muted-foreground border-border focus:border-primary transition-colors duration-200 resize-none"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] h-12 text-base font-medium"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;