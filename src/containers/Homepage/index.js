import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="relative bg-slate-800">
      <div className="grid place-items-center h-screen">
        <div className="bg-white rounded-lg shadow-md">
          <div className="mx-40 my-10">
            <div>
              <h1 className="font-bold text-3xl mb-5">
                Hi Robert, check out this page
              </h1>
              <Link to="/contactInfo">
                <Button colorScheme="linkedin" size="lg">
                  See all contacts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
