'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

const STORAGE_KEY = 'reading_onboarding_data';

export function OnboardingProvider({ children }) {
  // Core states
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [schoolMethod, setSchoolMethod] = useState(null);
  const [learningDifference, setLearningDifference] = useState(null);
  const [homeChallenge, setHomeChallenge] = useState(null);
  const [childGender, setChildGender] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [childName, setChildName] = useState("");
  const [teacherRecommended, setTeacherRecommended] = useState(null);
  const [parentEmail, setParentEmail] = useState("");
  const [referralSource, setReferralSource] = useState(null);
  const [readingStage, setReadingStage] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.selectedAge) setSelectedAge(data.selectedAge);
        if (data.selectedReason) setSelectedReason(data.selectedReason);
        if (data.selectedStatus) setSelectedStatus(data.selectedStatus);
        if (data.schoolMethod) setSchoolMethod(data.schoolMethod);
        if (data.learningDifference) setLearningDifference(data.learningDifference);
        if (data.homeChallenge) setHomeChallenge(data.homeChallenge);
        if (data.childGender) setChildGender(data.childGender);
        if (data.selectedAvatar) setSelectedAvatar(data.selectedAvatar);
        if (data.childName) setChildName(data.childName);
        if (data.teacherRecommended !== undefined) setTeacherRecommended(data.teacherRecommended);
        if (data.parentEmail) setParentEmail(data.parentEmail);
        if (data.referralSource) setReferralSource(data.referralSource);
        if (data.readingStage) setReadingStage(data.readingStage);
      } catch (e) {
        console.error("Failed to parse onboarding data from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;

    const dataToSave = {
      selectedAge,
      selectedReason,
      selectedStatus,
      schoolMethod,
      learningDifference,
      homeChallenge,
      childGender,
      selectedAvatar,
      childName,
      teacherRecommended,
      parentEmail,
      referralSource,
      readingStage
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [
    selectedAge, selectedReason, selectedStatus, schoolMethod, 
    learningDifference, homeChallenge, childGender, selectedAvatar, 
    childName, teacherRecommended, parentEmail, referralSource,
    readingStage, isInitialized
  ]);

  const updateDirection = (newDirection) => setDirection(newDirection);

  return (
    <OnboardingContext.Provider value={{ 
      selectedAge, 
      setSelectedAge,
      selectedReason,
      setSelectedReason,
      selectedStatus,
      setSelectedStatus,
      schoolMethod,
      setSchoolMethod,
      learningDifference,
      setLearningDifference,
      homeChallenge,
      setHomeChallenge,
      childGender,
      setChildGender,
      selectedAvatar,
      setSelectedAvatar,
      childName,
      setChildName,
      teacherRecommended,
      setTeacherRecommended,
      parentEmail,
      setParentEmail,
      referralSource,
      setReferralSource,
      readingStage,
      setReadingStage,
      direction, 
      updateDirection 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
