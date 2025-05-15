import { NextPage } from "next";
import { Banner } from "@/modules/homepage/components";
import BestSellerList from "@/modules/homepage/components/BestSellerList";
import FeturedProduct from "@/modules/homepage/components/FeturedProduct";
import BreadCrumb from "@/common/components/BreadCrumb";


export default function Home() {
  return (
    <>
      <BreadCrumb
        items={[
          { pageName: "Home", url: "/" },
        ]}
        className=""
      />

      <Banner />

      <BestSellerList />

      <FeturedProduct />
    </>
  );
}
