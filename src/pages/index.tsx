import React from 'react'
import Hero from 'components/Hero'
import Container from 'components/Container'
import Features from 'components/Features'
import Testimonials from 'components/Testimonials/Index'
import Pricing from 'components/Pricing/Index'
import Footer from 'components/Footer/Index'
import Nav from 'components/Navbar/Index'
import { Box, Text, VStack } from '@chakra-ui/react'
import { FAQSection } from 'components/FAQ/Index'

const faqs: any[] = [
  {
    q: "How many clients can I bring on?",
    a: "You can bring on 3 clients with the Free plan. Upgrade to Pro for additional seats.",
  },
  {
    q: "Can I connect it to my CRM?",
    a: "Yes! We support Notion and PipeDrive currently.",
  },
  {
    q: "Do you support international payments?",
    a: "Yes - payments can be made from and to any country.",
  },
  {
    q: "Who can I connect to for support?",
    a: "Email me at sukh@saasbase.dev",
  },
];


const Index = () => (
  <>
      <Nav />
    <Container>

    <Hero />
    <Features />
    <Testimonials />
      <Pricing />
      <Container py={28} minW="container.md">
          <Box w="full">
            <VStack spacing={10} w="full">
              <Text fontWeight={500} fontSize="2xl" align="center">
                Frequently asked questions
              </Text>
              <FAQSection items={faqs} />
            </VStack>
          </Box>
        </Container>
  </Container>
    <Footer />
  </>
)

export default Index
