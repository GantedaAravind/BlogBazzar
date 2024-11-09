import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../config";
import { blogType } from "../common/someDataTypes";
import toast from "react-hot-toast";
import axios from "axios";
import TrendingBlog from "../components/TrendingBlog";
import SimpleBlog from "../components/SimpleBlog";
import playSound from "../common/playSound";
import TrendingBlogSkeleton from "../components/TrendingBlogSkeleton";
import SimpleBlogSkeletion from "../components/SimpleBlogSkeletion";

import {motion } from "framer-motion";

interface ImageItem {
  url: string;
  category: string;
  imageUrl: string;
  heading: string;
}

const Home: React.FC = () => {
  const images: ImageItem[] = [
    {
      url: "software-development",
      category: "Software Development",
      imageUrl: "/SoftwareDevelopment.jpg",
      heading: "Master the Art of Coding",
    },
    {
      url: "ai-and-machine-learning",
      category: "AI and Machine Learning",
      imageUrl: "/AIMachineLearning.jpg",
      heading: "Unlock the Future with AI",
    },
    {
      url: "web-development",
      category: "Web Development",
      imageUrl: "/WebDevelopment.jpg",
      heading: "Build Dynamic Websites with Ease",
    },
    {
      url: "blockchain-and-cryptocurrencies",
      category: "Blockchain and Cryptocurrencies",
      imageUrl: "/Blockchain.webp",
      heading: "Revolutionize Transactions with Blockchain",
    },
    {
      url: "cybersecurity-and-data-privacy",
      category: "Cybersecurity and Data Privacy",
      imageUrl: "/Cybersecurity.jfif",
      heading: "Protect Your Digital Assets",
    },
    {
      url: "lifestyle",
      category: "Lifestyle",
      imageUrl: "/Lifestyle.jpg",
      heading: "Enhance Your Everyday Living",
    },
    {
      url: "education",
      category: "Education",
      imageUrl: "/Education.png",
      heading: "Learn and Grow Every Day",
    },
    {
      url: "food-and-cooking",
      category: "Food & Cooking",
      imageUrl: "/FoodCooking.webp",
      heading: "Savor the Flavors of Culinary Arts",
    },
    {
      url: "entertainment",
      category: "Entertainment",
      imageUrl: "/Entertainment.png",
      heading: "Explore the World of Entertainment",
    },
  ];

  const [latestBlogs, setLatestBlogs] = useState<blogType[]>([]);
  const [trendingBlog, setTrendingBLog] = useState<blogType[]>([]);
  const [loadTreanding, setLoadTrending] = useState<boolean>(false);
  const [loadLatest, setLatest] = useState<boolean>(false);

  const fetchLatestBlogs = async () => {
    setLatest(true);
    try {
      const response = await axiosInstance.get(`/blog/latest`);

      const dataResponse = response.data;

      if (dataResponse.success) {
        setLatestBlogs(dataResponse.data);
        // console.log(dataResponse.data);
        // toast.success(dataResponse.message);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      // Type assertion for better error handling
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    setLatest(false);
  };
  const fetchTreandingBlogs = async () => {
    setLoadTrending(true);
    try {
      const response = await axiosInstance.get(`/blog/treanding`);
      const dataResponse = response.data;
      if (dataResponse.success) {
        setTrendingBLog(dataResponse.data);
        // console.log(dataResponse.data);
        // toast.success(dataResponse.message);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      // Type assertion for better error handling
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoadTrending(false);
  };

  useEffect(() => {
    fetchLatestBlogs();
    fetchTreandingBlogs();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center lg:flex-row  justify-between ">
        <div className="w-[90%] lg:w-[63%] mx-auto lg:mx-8   rounded-lg overflow-hidden">
          <motion.div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="2000"
                >
                  <Link
                    to={`/category/${image.url}`}
                    onClick={() => {
                      playSound();
                    }}
                  >
                    <img
                      src={image.imageUrl}
                      className="d-block w-100 aspect-[7/4]"
                      alt={image.category}
                    />
                  </Link>
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="capitalize font-semibold text-white  text-md md:text-lg lg:text-xl ">
                      {image.heading}
                    </h5>
                    <p className="text-white ">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </motion.div>
        </div>
        <div className="w-[90%] mx-auto lg:w-[35%]">
          <h2 className="text-md  md:text-xl font-semibold">Latest Blogs</h2>
          <div className="flex flex-col items-center justify-around gap-2 m-2">
            {loadLatest && (
              <div className="w-[95%]">
                <TrendingBlogSkeleton />
                <TrendingBlogSkeleton />
                <TrendingBlogSkeleton />
              </div>
            )}
            {latestBlogs.map((blog) => {
              return (
                <TrendingBlog
                  key={blog._id}
                  _id={blog._id}
                  category={blog.category}
                  authorId={blog.authorId}
                  content={blog.content}
                  title={blog.title}
                  featuredImage={blog.featuredImage}
                  createdAt={blog.createdAt}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="m-4">
        <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold">
          Treanding Blogs
        </h2>
        <div className="my-4">
          {loadTreanding && (
            <div className="text-white">
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
              <SimpleBlogSkeletion />
            </div>
          )}
          {!loadTreanding &&
            trendingBlog.map((blog) => {
              return (
                <SimpleBlog
                  key={blog._id}
                  _id={blog._id}
                  title={blog.title}
                  content={blog.content}
                  authorId={blog.authorId}
                  featuredImage={blog.featuredImage}
                  showDelete={false}
                  createdAt={blog.createdAt}
                  category={blog.category}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
