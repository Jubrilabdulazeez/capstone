import { MainLayout } from "@/components/layout/MainLayout";
import { CalculatorInterface } from "@/components/calculator/CalculatorInterface";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const validCountries = ["rwanda", "ghana", "south-africa"];

interface Props {
  params: { country: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const country = params.country;
  const countryName = country === "south-africa" ? "South Africa" :
                     country.charAt(0).toUpperCase() + country.slice(1);

  return {
    title: `${countryName} Equivalency Calculator | EduConnect Africa`,
    description: `Convert your Nigerian WAEC/NECO grades to ${countryName} university admission requirements.`,
  };
}

export function generateStaticParams() {
  return validCountries.map((country) => ({
    country: country,
  }));
}

export default function CountryCalculatorPage({ params }: Props) {
  const { country } = params;

  if (!validCountries.includes(country)) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl mx-auto">
        <CalculatorInterface country={country} />
      </div>
    </MainLayout>
  );
}
