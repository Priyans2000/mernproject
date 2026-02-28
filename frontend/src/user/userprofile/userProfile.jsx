import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate(); // 🔥 added

  const [profileData, setProfileData] = useState({
    id: "EMP-001",
    name: "Priyansh Agrawal",
    email: "priyansh@gmail.com",
    phone: "9876543210",
    address: "123 Street",
    city: "Bhopal",
    state: "MP",
    country: "India",
    about: "Frontend Developer passionate about MERN stack.",
  });

  const [originalData, setOriginalData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg",
  );
  const [coverPreview, setCoverPreview] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  );

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    setIsEditing(true);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "avatar") {
      setAvatarPreview(previewUrl);
      setAvatarFile(file);
    }

    if (type === "cover") {
      setCoverPreview(previewUrl);
      setCoverFile(file);
    }

    setIsEditing(true);
  };

  const handleSave = async () => {
    const formData = new FormData();

    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    if (avatarFile) formData.append("avatar", avatarFile);
    if (coverFile) formData.append("cover", coverFile);

    try {
      // 🔥 yaha API call lagana hoga future me
      setOriginalData(profileData);
      setIsEditing(false);
      alert("Profile Updated ✅");
      // 🔥 Redirect to Home
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Update Failed ❌");
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Section */}
      <div className="relative h-60 w-full">
        <img
          src={coverPreview}
          alt="cover"
          className="w-full h-full object-cover"
        />

        <div
          onClick={() => coverInputRef.current.click()}
          className="absolute top-4 right-4 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
        >
          <Camera className="text-white w-5 h-5" />
        </div>

        <input
          type="file"
          hidden
          ref={coverInputRef}
          accept="image/*"
          onChange={(e) => handleImageChange(e, "cover")}
        />

        {/* Avatar */}
        <div className="absolute -bottom-16 left-20">
          <div className="relative">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />

            <div
              onClick={() => avatarInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full cursor-pointer hover:bg-black"
            >
              <Camera className="text-white w-4 h-4" />
            </div>

            <input
              type="file"
              hidden
              ref={avatarInputRef}
              accept="image/*"
              onChange={(e) => handleImageChange(e, "avatar")}
            />
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{profileData.name}</h2>
          <p className="text-gray-500">ID: {profileData.id}</p>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="state"
            value={profileData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="country"
            value={profileData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-6">
          <textarea
            name="about"
            value={profileData.about}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button
            onClick={handleCancel}
            disabled={!isEditing}
            className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!isEditing}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
