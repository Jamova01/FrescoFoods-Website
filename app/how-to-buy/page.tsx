import { StepCard } from "components/StepCard";

export default function HowToBuy() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Become a Customer</h1>
        <p className="text-gray-600 mb-8">
          Follow the next steps to become a customer:
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <StepCard
          stepNumber={1}
          stepText="Download the PDF forms"
          description="Click below to download the necessary PDF forms."
          buttonText1="Download PDF 1"
          buttonLink1="/Fresco Foods_ACH_Authorization Form_P_compressed.pdf"
          buttonText2="Download PDF 2"
          buttonLink2="/Fresco Foods_New Customer_Registration Form_C_compressed.pdf"
          buttonText3="Download PDF 3"
          buttonLink3="/st3_compressed.pdf"
        />
        <StepCard
          stepNumber={2}
          stepText="Fill Them Out"
          description="Complete the downloaded PDF forms with your information."
        />
        <StepCard
          stepNumber={3}
          stepText="Send Documents"
          description="Scan the completed documents and send them to contact@frescofoodsmn.com."
        />
      </div>
    </div>
  );
}
