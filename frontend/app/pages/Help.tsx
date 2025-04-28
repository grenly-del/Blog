import React from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const Help: React.FC = () => {
  return (
    <div className="help-page">
      <div className="max-w-[1520px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Help Center <FaQuestionCircle className="inline-block mr-2 text-2xl" />
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
          <p>
            <strong className=" text-gray-600 mb-4">Q: How do I reset my password?</strong>
            <br />
            Answer: To reset your password, visit the login page and click on the "Forgot Password" link. (comming soon)
          </p>
          <br />
          <p>
            <strong className=" text-gray-600 mb-4">Q: How can I contact customer support?</strong>
            <br />
            Answer: You can reach our customer support team at:
            <br />
            <br />
            <FaEnvelope className="inline-block mr-2 text-lg" />{' '}
            <a href="mailto:support@example.com">support@example.com</a>
            <br />
            <FaPhone className="inline-block mr-2 text-lg" /> +1 (123) 456-7890
          </p>

          {/* You can add more FAQ items as needed */}
        </div>

        {/* Additional content */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p>
            If you have any other questions or need further assistance, please don't hesitate to contact us.
          </p>
          <p>
            <FaEnvelope className="inline-block mr-2 text-lg" />{' '}
            <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
