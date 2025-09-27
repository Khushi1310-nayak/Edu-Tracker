import React from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { CheckCircle, BookOpen, Calendar, FileText, Upload, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  const steps = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      title: "Step 1: Add Your Subjects",
      description:
        "Start by adding all your subjects. This will be the foundation for tracking your attendance and exams.",
      link: "/Subjects",
      button: "Go to Subjects",
    },
    {
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      title: "Step 2: Track Attendance",
      description:
        "After adding subjects, head to the Attendance page to mark and track your progress. You’ll also see a summary on the Dashboard.",
      link: "/Attendance",
      button: "Go to Attendance",
    },
    {
      icon: <FileText className="w-6 h-6 text-pink-600" />,
      title: "Step 3: Add Exams",
      description:
        "Add your exams by type (Midterms, Finals, Quizzes, Revisions, etc.). These will show up on your Dashboard for easy tracking.",
      link: "/Exam",
      button: "Go to Exams",
    },
    {
      icon: <Upload className="w-6 h-6 text-blue-600" />,
      title: "Step 4: Dashboard Tools",
      description:
        "In your Dashboard, upload your resume and export your full attendance as a PDF whenever you want.",
      link: "/Dashboard",
      button: "Go to Dashboard",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: "Step 5: Share Feedback",
      description:
        "We’d love to hear your thoughts! Send us feedback directly from the Feedback page.",
      link: "/Feedback",
      button: "Go to Feedback",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-300">
        🚀 Get Started with Edu-Tracker
      </h1>
      <p className="text-center text-white mb-10">
        Follow these simple steps to set up your subjects, track your progress, and make the most out of Edu-Tracker.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-md rounded-2xl bg-gray-700">
            <CardContent className="p-6 flex flex-col items-start">
              <div className="mb-4">{step.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-white">{step.title}</h2>
              <p className="text-white mb-4">{step.description}</p>
              <Link to={step.link}>
                <Button className="rounded-xl">{step.button}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
        <p className="text-lg font-medium text-blue-400">
          That’s it! You’re all set to use Edu-Tracker like a pro ✨
        </p>
      </div>
    </div>
  );
}
