import MainLayout from "@/components/layout/MainLayout";
import FareCalculator from "@/components/admin/FareCalculator";

const FareEstimatorPage = () => {
  return (
    <MainLayout>
      <div className="bg-white p-6 sm:p-8 mt-10 max-w-2xl mx-auto rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-rental-blue">
          Fare Estimator
        </h2>
        <FareCalculator />
      </div>
    </MainLayout>
  );
};

export default FareEstimatorPage;
