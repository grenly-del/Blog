import React from "react";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaComments,
} from "react-icons/fa";

const Help: React.FC = () => {
  return (
    <div className="help-page bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-orange-700 flex items-center mb-6">
          <FaQuestionCircle className="mr-3 text-4xl" />
          Help Center
        </h1>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaComments className="mr-2 text-blue-500" /> Frequently Asked
            Questions
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-gray-700">
                Q: How do I reset my password?
              </p>
              <p className="text-gray-600">
                A: Visit the login page and click "Forgot Password". (Coming
                soon)
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                Q: How can I contact customer support?
              </p>
              <p className="text-gray-600">
                A: You can reach us via:
                <br />
                <FaEnvelope className="inline mr-2 text-orange-500" />
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:underline"
                >
                  MERNdelights@example.com
                </a>
                <br />
                <FaPhone className="inline mr-2 text-green-500" />
                +1 (123) 456-7890
              </p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="mb-2 text-gray-600">
            Need more help? Reach out and we’ll get back to you!
          </p>
          <p className="text-gray-600">
            <FaEnvelope className="inline mr-2 text-orange-500" />
            <a
              href="mailto:info@example.com"
              className="text-blue-600 hover:underline"
            >
              MERNdelights@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
