"use client";
import MainCarousel from "./components/Carousel";
import ListProducts from "./components/ListProducts";
import { viewproducts } from "./services/product";
import { useQuery } from "react-query";
import useAuth from "./hooks/useAuth";
import Spinner from "./components/Spinner";
import useIsClient from "./hooks/useIsClient";
import { Box, Container, Flex } from "./lib";
import { getcategory } from "./services/category";
import { HeadingXL } from "./components/styles";
import ProductLoading from "./components/productLoading";
import ButtonComp from "./components/Button";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "./utils/functions";

export default function Home() {
  const { userid } = useAuth();
  const isClient = useIsClient();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ["viewproducts", 1, 28],
    () => viewproducts(1, 28),
    {
      enabled: !!userid,
    },
  );
  const { data: category, isLoading: categoryLoading } = useQuery(
    ["getcategory", true],
    () => getcategory(0, 0, true),
  );
  return (
    isClient && (
      <Container className="pt-20">
        {isLoading ? (
          <Box className="flex items-center justify-center min-h-screen ">
            <Spinner height="h-20" width="w-20" />
          </Box>
        ) : (
          <Box className="min-h-screen">
            <Box className="px-[8px]">
              <MainCarousel />
            </Box>

            {category?.allCategory?.map((catItem: any) => {
              // Filter products that belong to the current category
              const filteredProducts = data?.products?.filter(
                (prodItem: any) => prodItem.category === catItem.name,
              );

              return (
                <>
                  {Array.isArray(filteredProducts) &&
                    filteredProducts.length > 0 && (
                      <Box className="mt-6">
                        {categoryLoading ? (
                          <div className="h-8 w-48 mb-4 mt-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        ) : (
                          <Flex justify="space-between" align="center">
                            <HeadingXL>
                              {capitalizeFirstLetter(catItem.name)}
                            </HeadingXL>
                            <ButtonComp
                              text="View all"
                              className="max-w-max"
                              func={async () => {
                                router.push(
                                  `listproducts?filterCategory=${catItem.name}`,
                                );
                              }}
                            />
                          </Flex>
                        )}
                      </Box>
                    )}
                  <Box className="flex flex-wrap mt-2">
                    {isLoading || categoryLoading ? (
                      <ProductLoading count={4} />
                    ) : (
                      Array.isArray(filteredProducts) &&
                      filteredProducts.length > 0 &&
                      filteredProducts
                        .slice(0, 4)
                        .map((product) => (
                          <ListProducts product={product} key={product._id} />
                        ))
                    )}
                  </Box>
                </>
              );
            })}
          </Box>
        )}
      </Container>
    )
  );
}
