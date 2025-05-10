/* eslint-disable */

import React from 'react'
import { Box, Typography, Container, Paper } from '@mui/material'

export default function Terms() {
  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: '#1e1f22',
          color: '#ffffff',
          borderRadius: 2,
          border: '1px solid rgba(0, 255, 255, 0.2)',
          boxShadow: `
            0 0 30px rgba(0, 255, 255, 0.2),
            0 0 50px rgba(0, 255, 255, 0.2),
            0 0 70px rgba(0, 255, 255, 0.2)
          `,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 32px)',
        }}
      >
        {/* Title and Last Updated */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          TERMS OF SERVICE
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
        >
          Last updated January 05, 2025
        </Typography>
        {/* Agreement Section */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          AGREEMENT TO OUR LEGAL TERMS
        </Typography>
        <Typography paragraph>
          We are doing business as your_service_name, Inc. ("Company," "we," "us," "our"), a company registered
          in Japan at Machiya, Arakawa-ku, Tokyo 1160001. Our VAT number is 5011501029530.
        </Typography>
        <Typography paragraph>
          We operate the website https://hackers-guild.tech (the "Site"), as well as any other
          related products and services that refer or link to these legal terms (the "Legal Terms")
          (collectively, the "Services").
        </Typography>
        <Typography paragraph>
          It is a platform that matches private detectives with OSINT skills with clients
        </Typography>
        <Typography paragraph>
          You can contact us by phone at 07039832820, email at allen_shintani@alaia-inc.com, or by
          mail to Machiya, Arakawa-ku, Tokyo 1160001, Japan.
        </Typography>
        <Typography paragraph>
          These Legal Terms constitute a legally binding agreement made between you, whether
          personally or on behalf of an entity ("you"), and your_service_name, Inc. concerning your access to
          and use of the Services. You agree that by accessing the Services, you have read,
          understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH
          ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND
          YOU MUST DISCONTINUE USE IMMEDIATELY.
        </Typography>
        <Typography paragraph>
          Supplemental terms and conditions or documents that may be posted on the Services from
          time to time are hereby expressly incorporated herein by reference. We reserve the right,
          in our sole discretion, to make changes or modifications to these Legal Terms from time to
          time. We will alert you about any changes by updating the "Last updated" date of these
          Legal Terms, and you waive any right to receive specific notice of each such change. It is
          your responsibility to periodically review these Legal Terms to stay informed of updates.
          You will be subject to, and will be deemed to have been made aware of and to have
          accepted, the changes in any revised Legal Terms by your continued use of the Services
          after the date such revised Legal Terms are posted.
        </Typography>
        <Typography paragraph>
          The Services are intended for users who are at least 18 years old. Persons under the age
          of 18 are not permitted to use or register for the Services.
        </Typography>
        <Typography paragraph>
          We recommend that you print a copy of these Legal Terms for your records.
        </Typography>
        {/* Table of Contents */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          TABLE OF CONTENTS
        </Typography>
        <Box
          component="ol"
          sx={{ pl: 4, mb: 6 }}
        >
          {[
            'OUR SERVICES',
            'INTELLECTUAL PROPERTY RIGHTS',
            'USER REPRESENTATIONS',
            'USER REGISTRATION',
            'PURCHASES AND PAYMENT',
            'POLICY',
            'PROHIBITED ACTIVITIES',
            'USER GENERATED CONTRIBUTIONS',
            'CONTRIBUTION LICENSE',
            'GUIDELINES FOR REVIEWS',
            'SOCIAL MEDIA',
            'THIRD-PARTY WEBSITES AND CONTENT',
            'SERVICES MANAGEMENT',
            'PRIVACY POLICY',
            'DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND POLICY',
            'TERM AND TERMINATION',
            'MODIFICATIONS AND INTERRUPTIONS',
            'GOVERNING LAW',
            'DISPUTE RESOLUTION',
            'CORRECTIONS',
            'DISCLAIMER',
            'LIMITATIONS OF LIABILITY',
            'INDEMNIFICATION',
            'USER DATA',
            'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES',
            'SMS TEXT MESSAGING',
            'CALIFORNIA USERS AND RESIDENTS',
            'MISCELLANEOUS',
            'CONFIDENTIALITY',
            'GOVERNING LAW',
            'CONTACT US',
          ].map((item, index) => (
            <Typography
              component="li"
              key={index}
              sx={{ mb: 1 }}
            >
              {`${index + 1}. ${item}`}
            </Typography>
          ))}
        </Box>
        {/* Section 1 */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          1. OUR SERVICES
        </Typography>
        <Typography paragraph>
          The information provided when using the Services is not intended for distribution to or
          use by any person or entity in any jurisdiction or country where such distribution or use
          would be contrary to law or regulation or which would subject us to any registration
          requirement within such jurisdiction or country. Accordingly, those persons who choose to
          access the Services from other locations do so on their own initiative and are solely
          responsible for compliance with local laws, if and to the extent local laws are
          applicable.
        </Typography>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          2. INTELLECTUAL PROPERTY RIGHTS
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
        >
          Our intellectual property
        </Typography>
        <Typography paragraph>
          We are the owner or the licensee of all intellectual property rights in our Services,
          including all source code, databases, functionality, software, website designs, audio,
          video, text, photographs, and graphics in the Services (collectively, the "Content"), as
          well as the trademarks, service marks, and logos contained therein (the "Marks").
        </Typography>
        <Typography paragraph>
          Our Content and Marks are protected by copyright and trademark laws (and various other
          intellectual property rights and unfair competition laws) and treaties in the United
          States and around the world.
        </Typography>
        <Typography paragraph>
          The Content and Marks are provided in or through the Services "AS IS" for your personal,
          non-commercial use only.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          sx={{ mt: 4 }}
        >
          Your use of our Services
        </Typography>
        <Typography paragraph>
          Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES"
          section below, we grant you a non-exclusive, non-transferable, revocable license to:
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography component="li">access the Services; and</Typography>
          <Typography component="li">
            download or print a copy of any portion of the Content to which you have properly gained
            access,
          </Typography>
        </Box>
        <Typography paragraph>solely for your personal, non-commercial use.</Typography>
        <Typography paragraph>
          Except as set out in this section or elsewhere in our Legal Terms, no part of the Services
          and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded,
          posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed,
          or otherwise exploited for any commercial purpose whatsoever, without our express prior
          written permission.
        </Typography>
        <Typography paragraph>
          If you wish to make any use of the Services, Content, or Marks other than as set out in
          this section or elsewhere in our Legal Terms, please address your request to:
          allen_shintani@alaia-inc.com. If we ever grant you the permission to post, reproduce, or
          publicly display any part of our Services or Content, you must identify us as the owners
          or licensors of the Services, Content, or Marks and ensure that any copyright or
          proprietary notice appears or is visible on posting, reproducing, or displaying our
          Content.
        </Typography>
        <Typography paragraph>
          We reserve all rights not expressly granted to you in and to the Services, Content, and
          Marks.
        </Typography>
        <Typography paragraph>
          Any breach of these Intellectual Property Rights will constitute a material breach of our
          Legal Terms and your right to use our Services will terminate immediately.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          sx={{ mt: 4 }}
        >
          Your submissions and contributions
        </Typography>
        <Typography paragraph>
          Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to
          using our Services to understand the (a) rights you give us and (b) obligations you have
          when you post or upload any content through the Services.
        </Typography>
        <Typography paragraph>
          Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or
          other information about the Services ("Submissions"), you agree to assign to us all
          intellectual property rights in such Submission. You agree that we shall own this
          Submission and be entitled to its unrestricted use and dissemination for any lawful
          purpose, commercial or otherwise, without acknowledgment or compensation to you.
        </Typography>
        <Typography paragraph>
          Contributions: The Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality during which you may create,
          submit, post, display, transmit, publish, distribute, or broadcast content and materials
          to us or through the Services, including but not limited to text, writings, video, audio,
          photographs, music, graphics, comments, reviews, rating suggestions, personal information,
          or other material ("Contributions"). Any Submission that is publicly posted shall also be
          treated as a Contribution.
        </Typography>
        <Typography paragraph>
          You understand that Contributions may be viewable by other users of the Services and
          possibly through third-party websites.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          sx={{ mt: 4 }}
        >
          When you post Contributions, you grant us a license (including use of your name,
          trademarks, and logos)
        </Typography>
        <Typography paragraph>
          By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable,
          perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and
          license to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle,
          store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in
          part), and exploit your Contributions (including, without limitation, your image, name,
          and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative
          works of, or incorporate into other works, your Contributions, and to sublicense the
          licenses granted in this section. Our use and distribution may occur in any media formats
          and through any media channels.
        </Typography>
        <Typography paragraph>
          This license includes our use of your name, company name, and franchise name, as
          applicable, and any of the trademarks, service marks, trade names, logos, and personal and
          commercial images you provide.
        </Typography>
        {/* Section 3 USER REPRESENTATIONS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          3. USER REPRESENTATIONS
        </Typography>
        <Typography paragraph>
          By using the Services, you represent and warrant that: (1) all registration information
          you submit will be true, accurate, current, and complete; (2) you will maintain the
          accuracy of such information and promptly update such registration information as
          necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms;
          (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access
          the Services through automated or non-human means, whether through a bot, script or
          otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and
          (7) your use of the Services will not violate any applicable law or regulation.
        </Typography>
        <Typography paragraph>
          If you provide any information that is untrue, inaccurate, not current, or incomplete, we
          have the right to suspend or terminate your account and refuse any and all current or
          future use of the Services (or any portion thereof).
        </Typography>
        {/* Section 4 USER REGISTRATION */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          4. USER REGISTRATION
        </Typography>
        <Typography paragraph>
          You may be required to register to use the Services. You agree to keep your password
          confidential and will be responsible for all use of your account and password. We reserve
          the right to remove, reclaim, or change a username you select if we determine, in our sole
          discretion, that such username is inappropriate, obscene, or otherwise objectionable.
        </Typography>
        {/* Section 5 PURCHASES AND PAYMENT */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          5. PURCHASES AND PAYMENT
        </Typography>
        <Typography paragraph>We accept the following forms of payment:</Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography component="li">Visa</Typography>
          <Typography component="li">Mastercard</Typography>
          <Typography component="li">American Express</Typography>
        </Box>
        <Typography paragraph>
          You agree to provide current, complete, and accurate purchase and account information for
          all purchases made via the Services. You further agree to promptly update account and
          payment information, including email address, payment method, and payment card expiration
          date, so that we can complete your transactions and contact you as needed. Sales tax will
          be added to the price of purchases as deemed required by us. We may change prices at any
          time. All payments shall be in US dollars.
        </Typography>
        <Typography paragraph>
          You agree to pay all charges at the prices then in effect for your purchases and any
          applicable shipping fees, and you authorize us to charge your chosen payment provider for
          any such amounts upon placing your order. We reserve the right to correct any errors or
          mistakes in pricing, even if we have already requested or received payment.
        </Typography>
        <Typography paragraph>
          We reserve the right to refuse any order placed through the Services. We may, in our sole
          discretion, limit or cancel quantities purchased per person, per household, or per order.
          These restrictions may include orders placed by or under the same customer account, the
          same payment method, and/or orders that use the same billing or shipping address. We
          reserve the right to limit or prohibit orders that, in our sole judgment, appear to be
          placed by dealers, resellers, or distributors.
        </Typography>
        {/* Section 6 POLICY */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          6. POLICY
        </Typography>
        <Typography paragraph>All sales are final and no refund will be issued.</Typography>
        {/* Section 7 PROHIBITED ACTIVITIES */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          7. PROHIBITED ACTIVITIES
        </Typography>
        <Typography paragraph>
          You may not access or use the Services for any purpose other than that for which we make
          the Services available. The Services may not be used in connection with any commercial
          endeavors except those that are specifically endorsed or approved by us.
        </Typography>
        <Typography paragraph>As a user of the Services, you agree not to:</Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Systematically retrieve data or other content from the Services to create or compile,
            directly or indirectly, a collection, compilation, database, or directory without
            written permission from us.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Trick, defraud, or mislead us and other users, especially in any attempt to learn
            sensitive account information such as user passwords.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Circumvent, disable, or otherwise interfere with security-related features of the
            Services, including features that prevent or restrict the use or copying of any Content
            or enforce limitations on the use of the Services and/or the Content contained therein.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Use any information obtained from the Services in order to harass, abuse, or harm
            another person.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Make improper use of our support services or submit false reports of abuse or
            misconduct.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Use the Services in a manner inconsistent with any applicable laws or regulations.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Engage in unauthorized framing of or linking to the Services.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or
            other material, including excessive use of capital letters and spamming (continuous
            posting of repetitive text), that interferes with any party's uninterrupted use and
            enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the
            use, features, functions, operation, or maintenance of the Services.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Engage in any automated use of the system, such as using scripts to send comments or
            messages, or using any data mining, robots, or similar data gathering and extraction
            tools.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Delete the copyright or other proprietary rights notice from any Content.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Attempt to impersonate another user or person or use the username of another user.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Upload or transmit (or attempt to upload or to transmit) any material that acts as a
            passive or active information collection or transmission mechanism, including without
            limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies,
            or other similar devices (sometimes referred to as "spyware" or "passive collection
            mechanisms" or "pcms").
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Interfere with, disrupt, or create an undue burden on the Services or the networks or
            services connected to the Services.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Harass, annoy, intimidate, or threaten any of our employees or agents engaged in
            providing any portion of the Services to you.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Attempt to bypass any measures of the Services designed to prevent or restrict access to
            the Services, or any portion of the Services.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML,
            JavaScript, or other code.
          </Typography>
        </Box>
        {/* Section 8 USER GENERATED CONTRIBUTIONS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          8. USER GENERATED CONTRIBUTIONS
        </Typography>
        <Typography paragraph>
          The Services may invite you to chat, contribute to, or participate in blogs, message
          boards, online forums, and other functionality, and may provide you with the opportunity
          to create, submit, post, display, transmit, perform, publish, distribute, or broadcast
          content and materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions, or personal
          information or other material (collectively, "Contributions"). Contributions may be
          viewable by other users of the Services and through third-party websites. As such, any
          Contributions you transmit may be treated as non-confidential and non-proprietary. When
          you create or make available any Contributions, you thereby represent and warrant that:
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            The creation, distribution, transmission, public display, or performance, and the
            accessing, downloading, or copying of your Contributions do not and will not infringe
            the proprietary rights, including but not limited to the copyright, patent, trademark,
            trade secret, or moral rights of any third party.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            You are the creator and owner of or have the necessary licenses, rights, consents,
            releases, and permissions to use and to authorize us, the Services, and other users of
            the Services to use your Contributions in any manner contemplated by the Services and
            these Legal Terms.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            You have the written consent, release, and/or permission of each and every identifiable
            individual person in your Contributions to use the name or likeness of each and every
            such identifiable individual person to enable inclusion and use of your Contributions in
            any manner contemplated by the Services and these Legal Terms.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions are not false, inaccurate, or misleading.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions are not unsolicited or unauthorized advertising, promotional
            materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of
            solicitation.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing,
            libelous, slanderous, or otherwise objectionable (as determined by us).
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not violate any applicable law, regulation, or rule.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not violate the privacy or publicity rights of any third party.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not violate any applicable law concerning child pornography, or
            otherwise intended to protect the health or well-being of minors.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not include any offensive comments that are connected to race,
            national origin, gender, sexual preference, or physical handicap.
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Your Contributions do not otherwise violate, or link to material that violates, any
            provision of these Legal Terms, or any applicable law or regulation.
          </Typography>
        </Box>
        <Typography paragraph>
          Any use of the Services in violation of the foregoing violates these Legal Terms and may
          result in, among other things, termination or suspension of your rights to use the
          Services.
        </Typography>
        {/* Section 9 CONTRIBUTION LICENSE */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          9. CONTRIBUTION LICENSE
        </Typography>
        <Typography paragraph>
          By posting your Contributions to any part of the Services or making Contributions
          accessible to the Services by linking your account from the Services to any of your social
          networking accounts, you automatically grant, and you represent and warrant that you have
          the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual,
          non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to
          host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive,
          store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt
          (in whole or in part), and distribute such Contributions (including, without limitation,
          your image and voice) for any purpose, commercial, advertising, or otherwise, and to
          prepare derivative works of, or incorporate into other works, such Contributions, and
          grant and authorize sublicenses of the foregoing. The use and distribution may occur in
          any media formats and through any media channels.
        </Typography>
        <Typography paragraph>
          This license will apply to any form, media, or technology now known or hereafter
          developed, and includes our use of your name, company name, and franchise name, as
          applicable, and any of the trademarks, service marks, trade names, logos, and personal and
          commercial images you provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your Contributions.
        </Typography>
        <Typography paragraph>
          We do not assert any ownership over your Contributions. You retain full ownership of all
          of your Contributions and any intellectual property rights or other proprietary rights
          associated with your Contributions. We are not liable for any statements or
          representations in your Contributions provided by you in any area on the Services. You are
          solely responsible for your Contributions to the Services and you expressly agree to
          exonerate us from any and all responsibility and to refrain from any legal action against
          us regarding your Contributions.
        </Typography>
        <Typography paragraph>
          We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise
          change any Contributions; (2) to re-categorize any Contributions to place them in more
          appropriate locations on the Services; and (3) to pre-screen or delete any Contributions
          at any time and for any reason, without notice. We have no obligation to monitor your
          Contributions.
        </Typography>
        {/* Section 10 GUIDELINES FOR REVIEWS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          10. GUIDELINES FOR REVIEWS
        </Typography>
        <Typography paragraph>
          We may provide you areas on the Services to leave reviews or ratings. When posting a
          review, you must comply with the following criteria:
        </Typography>
        <Box
          component="ol"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            you should have firsthand experience with the person/entity being reviewed;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            your reviews should not contain offensive profanity, or abusive, racist, offensive, or
            hateful language;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            your reviews should not contain discriminatory references based on religion, race,
            gender, national origin, age, marital status, sexual orientation, or disability;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            your reviews should not contain references to illegal activity;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            you should not be affiliated with competitors if posting negative reviews;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            you should not make any conclusions as to the legality of conduct;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            you may not post any false or misleading statements;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            you may not organize a campaign encouraging others to post reviews, whether positive or
            negative.
          </Typography>
        </Box>
        <Typography paragraph>
          We may accept, reject, or remove reviews in our sole discretion. We have absolutely no
          obligation to screen reviews or to delete reviews, even if anyone considers reviews
          objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily
          represent our opinions or the views of any of our affiliates or partners. We do not assume
          liability for any review or for any claims, liabilities, or losses resulting from any
          review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide,
          royalty-free, fully paid, assignable, and sublicensable right and license to reproduce,
          modify, translate, transmit by any means, display, perform, and/or distribute all content
          relating to review.
        </Typography>
        {/* Section 11 SOCIAL MEDIA */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          11. SOCIAL MEDIA
        </Typography>
        <Typography paragraph>
          As part of the functionality of the Services, you may link your account with online
          accounts you have with third-party service providers (each such account, a "Third-Party
          Account") by either: (1) providing your Third-Party Account sign in information through
          the Services; or (2) allowing us to access your Third-Party Account, as is permitted under
          the applicable terms and conditions that govern your use of each Third-Party Account. You
          represent and warrant that you are entitled to disclose your Third-Party Account sign in
          information to us and/or grant us access to your Third-Party Account, without breach by
          you of any of the terms and conditions that govern your use of the applicable Third-Party
          Account, and without obligating us to pay any fees or making us subject to any usage
          limitations imposed by the third-party service provider of the Third-Party Account.
        </Typography>
        <Typography paragraph>
          By granting us access to any Third-Party Accounts, you understand that (1) we may access,
          make available, and store (if applicable) any content that you have provided to and stored
          in your Third-Party Account (the "Social Network Content") so that it is available on and
          through the Services via your account, including without limitation any friend lists and
          (2) we may submit to and receive from your Third-Party Account additional information to
          the extent you are notified when you link your account with the Third-Party Account.
        </Typography>
        <Typography paragraph>
          Depending on the Third-Party Accounts you choose and subject to the privacy settings that
          you have set in such Third-Party Accounts, personally identifiable information that you
          post to your Third-Party Accounts may be available on and through your account on the
          Services. Please note that if a Third-Party Account or associated service becomes
          unavailable or our access to such Third-Party Account is terminated by the third-party
          service provider, then Social Network Content may no longer be available on and through
          the Services.
        </Typography>
        <Typography paragraph>
          You will have the ability to disable the connection between your account on the Services
          and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
          THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY
          BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS.
        </Typography>
        <Typography paragraph>
          We make no effort to review any Social Network Content for any purpose, including but not
          limited to, for accuracy, legality, or non-infringement, and we are not responsible for
          any Social Network Content. You acknowledge and agree that we may access your email
          address book associated with a Third-Party Account and your contacts list stored on your
          mobile device or tablet computer solely for purposes of identifying and informing you of
          those contacts who have also registered to use the Services.
        </Typography>
        <Typography paragraph>
          You can deactivate the connection between the Services and your Third-Party Account by
          contacting us using the contact information below or through your account settings (if
          applicable). We will attempt to delete any information stored on our servers that was
          obtained through such Third-Party Account, except the username and profile picture that
          become associated with your account.
        </Typography>
        {/* Section 12 THIRD-PARTY WEBSITES AND CONTENT */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          12. THIRD-PARTY WEBSITES AND CONTENT
        </Typography>
        <Typography paragraph>
          The Services may contain (or you may be sent via the Site) links to other websites
          ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures,
          designs, music, sound, video, information, applications, software, and other content or
          items belonging to or originating from third parties ("Third-Party Content"). Such
          Third-Party Websites and Third-Party Content are not investigated, monitored, or checked
          for accuracy, appropriateness, or completeness by us, and we are not responsible for any
          Third-Party Websites accessed through the Services or any Third-Party Content posted on,
          available through, or installed from the Services, including the content, accuracy,
          offensiveness, opinions, reliability, privacy practices, or other policies of or contained
          in the Third-Party Websites or the Third-Party Content.
        </Typography>
        <Typography paragraph>
          Inclusion of, linking to, or permitting the use or installation of any Third-Party
          Websites or any Third-Party Content does not imply approval or endorsement thereof by us.
          If you decide to leave the Services and access the Third-Party Websites or to use or
          install any Third-Party Content, you do so at your own risk, and you should be aware these
          Legal Terms no longer govern. You should review the applicable terms and policies,
          including privacy and data gathering practices, of any website to which you navigate from
          the Services or relating to any applications you use or install from the Services.
        </Typography>
        {/* Section 13 SERVICES MANAGEMENT */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          13. SERVICES MANAGEMENT
        </Typography>
        <Typography paragraph>We reserve the right, but not the obligation, to:</Typography>
        <Box
          component="ol"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            monitor the Services for violations of these Legal Terms;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            take appropriate legal action against anyone who, in our sole discretion, violates the
            law or these Legal Terms, including without limitation, reporting such user to law
            enforcement authorities;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            in our sole discretion and without limitation, refuse, restrict access to, limit the
            availability of, or disable (to the extent technologically feasible) any of your
            Contributions or any portion thereof;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            in our sole discretion and without limitation, notice, or liability, to remove from the
            Services or otherwise disable all files and content that are excessive in size or are in
            any way burdensome to our systems;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            otherwise manage the Services in a manner designed to protect our rights and property
            and to facilitate the proper functioning of the Services.
          </Typography>
        </Box>
        {/* Section 14 PRIVACY POLICY */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          14. PRIVACY POLICY
        </Typography>
        <Typography paragraph>
          We care about data privacy and security. By using the Services, you agree to be bound by
          our Privacy Policy posted on the Services, which is incorporated into these Legal Terms.
          Please be advised the Services are hosted in Japan. If you access the Services from any
          other region of the world with laws or other requirements governing personal data
          collection, use, or disclosure that differ from applicable laws in Japan, then through
          your continued use of the Services, you are transferring your data to Japan, and you
          expressly consent to have your data transferred to and processed in Japan.
        </Typography>
        {/* Section 15 DMCA NOTICE AND POLICY */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          15. DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND POLICY
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
        >
          Notifications
        </Typography>
        <Typography paragraph>
          We respect the intellectual property rights of others. If you believe that any material
          available on or through the Services infringes upon any copyright you own or control,
          please immediately notify our Designated Copyright Agent using the contact information
          provided below (a "Notification"). A copy of your Notification will be sent to the person
          who posted or stored the material addressed in the Notification. Please be advised that
          pursuant to federal law you may be held liable for damages if you make material
          misrepresentations in a Notification. Thus, if you are not sure that material located on
          or linked to by the Services infringes your copyright, you should consider first
          contacting an attorney.
        </Typography>
        <Typography paragraph>
          All Notifications should meet the requirements of DMCA 17 U.S.C. § 512(c)(3) and include
          the following information:
        </Typography>
        <Box
          component="ol"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            A physical or electronic signature of a person authorized to act on behalf of the owner
            of an exclusive right that is allegedly infringed;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            identification of the copyrighted work claimed to have been infringed, or, if multiple
            copyrighted works on the Services are covered by the Notification, a representative list
            of such works on the Services;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            identification of the material that is claimed to be infringing or to be the subject of
            infringing activity and that is to be removed or access to which is to be disabled, and
            information reasonably sufficient to permit us to locate the material;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            information reasonably sufficient to permit us to contact the complaining party, such as
            an address, telephone number, and, if available, an email address at which the
            complaining party may be contacted;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            a statement that the complaining party has a good faith belief that use of the material
            in the manner complained of is not authorized by the copyright owner, its agent, or the
            law;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            a statement that the information in the notification is accurate, and under penalty of
            perjury, that the complaining party is authorized to act on behalf of the owner of an
            exclusive right that is allegedly infringed upon.
          </Typography>
        </Box>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          sx={{ mt: 4 }}
        >
          Counter Notification
        </Typography>
        <Typography paragraph>
          If you believe your own copyrighted material has been removed from the Services as a
          result of a mistake or misidentification, you may submit a written counter notification to
          our Designated Copyright Agent using the contact information provided below (a "Counter
          Notification"). To be an effective Counter Notification under the DMCA, your Counter
          Notification must include substantially the following:
        </Typography>
        <Box
          component="ol"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            identification of the material that has been removed or disabled and the location at
            which the material appeared before it was removed or disabled;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            a statement that you consent to the jurisdiction of the Federal District Court in which
            your address is located, or if your address is outside the United States, for any
            judicial district in which we are located;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            a statement that you will accept service of process from the party that filed the
            Notification or the party's agent;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            your name, address, and telephone number;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            a statement under penalty of perjury that you have a good faith belief that the material
            in question was removed or disabled as a result of a mistake or misidentification of the
            material to be removed or disabled;
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            your physical or electronic signature.
          </Typography>
        </Box>
        <Typography paragraph>
          If you send us a valid, written Counter Notification meeting the requirements described
          above, we will restore your removed or disabled material, unless we first receive notice
          from the party filing the Notification informing us that such party has filed a court
          action to restrain you from engaging in infringing activity related to the material in
          question. Please note that if you materially misrepresent that the disabled or removed
          content was removed by mistake or misidentification, you may be liable for damages,
          including costs and attorney's fees. Filing a false Counter Notification constitutes
          perjury.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
          sx={{ mt: 4 }}
        >
          Designated Copyright Agent
        </Typography>
        <Box sx={{ pl: 4, mb: 3 }}>
          <Typography>Allen Shintani</Typography>
          <Typography>Attn: Copyright Agent</Typography>
          <Typography>Machiya</Typography>
          <Typography>7-1-1-404</Typography>
          <Typography>Arakawa-ku, Tokyo 1160001</Typography>
          <Typography>Japan</Typography>
          <Typography>allen_shintani@alaia-inc.com</Typography>
        </Box>
        {/* Section 16 TERM AND TERMINATION */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          16. TERM AND TERMINATION
        </Typography>
        <Typography paragraph>
          These Legal Terms shall remain in full force and effect while you use the Services.
          WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR
          SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES
          (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
          INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT
          CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE
          YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR
          INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
        </Typography>
        <Typography paragraph>
          If we terminate or suspend your account for any reason, you are prohibited from
          registering and creating a new account under your name, a fake or borrowed name, or the
          name of any third party, even if you may be acting on behalf of the third party. In
          addition to terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil, criminal, and
          injunctive redress.
        </Typography>
        {/* Section 17 MODIFICATIONS AND INTERRUPTIONS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          17. MODIFICATIONS AND INTERRUPTIONS
        </Typography>
        <Typography paragraph>
          We reserve the right to change, modify, or remove the contents of the Services at any time
          or for any reason at our sole discretion without notice. However, we have no obligation to
          update any information on our Services. We also reserve the right to modify or discontinue
          all or part of the Services without notice at any time. We will not be liable to you or
          any third party for any modification, price change, suspension, or discontinuance of the
          Services.
        </Typography>
        <Typography paragraph>
          We cannot guarantee the Services will be available at all times. We may experience
          hardware, software, or other problems or need to perform maintenance related to the
          Services, resulting in interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services at any time or for
          any reason without notice to you. You agree that we have no liability whatsoever for any
          loss, damage, or inconvenience caused by your inability to access or use the Services
          during any downtime or discontinuance of the Services. Nothing in these Legal Terms will
          be construed to obligate us to maintain and support the Services or to supply any
          corrections, updates, or releases in connection therewith.
        </Typography>
        {/* Section 18 GOVERNING LAW */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          18. GOVERNING LAW
        </Typography>
        <Typography paragraph>
          These Legal Terms shall be governed by and defined following the laws of Japan. your_service_name,
          Inc. and yourself irrevocably consent that the courts of Japan shall have exclusive
          jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
        </Typography>
        {/* Section 19 DISPUTE RESOLUTION */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          19. DISPUTE RESOLUTION
        </Typography>
        <Typography paragraph>
          You agree to irrevocably submit all disputes related to these Legal Terms or the legal
          relationship established by these Legal Terms to the jurisdiction of the Japan courts.
          your_service_name, Inc. shall also maintain the right to bring proceedings as to the substance of the
          matter in the courts of the country where you reside or, if these Legal Terms are entered
          into in the course of your trade or profession, the state of your principal place of
          business.
        </Typography>
        {/* Section 20 CORRECTIONS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          20. CORRECTIONS
        </Typography>
        <Typography paragraph>
          There may be information on the Services that contains typographical errors, inaccuracies,
          or omissions, including descriptions, pricing, availability, and various other
          information. We reserve the right to correct any errors, inaccuracies, or omissions and to
          change or update the information on the Services at any time, without prior notice.
        </Typography>
        {/* Section 21 DISCLAIMER */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          21. DISCLAIMER
        </Typography>
        <Typography paragraph>
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF
          THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
          DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE
          THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
          FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS
          ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES
          OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR
          RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
          PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS
          TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
          AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4)
          ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
          VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY
          ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR
          ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
          TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
        </Typography>
        {/* Section 22 LIMITATIONS OF LIABILITY */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          22. LIMITATIONS OF LIABILITY
        </Typography>
        <Typography paragraph>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD
          PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
          DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
          YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY
          CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO
          THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT
          ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
          IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT
          APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
        </Typography>
        {/* Section 23 INDEMNIFICATION */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          23. INDEMNIFICATION
        </Typography>
        <Typography paragraph>
          You agree to defend, indemnify, and hold us harmless, including our subsidiaries,
          affiliates, and all of our respective officers, agents, partners, and employees, from and
          against any loss, damage, liability, claim, or demand, including reasonable attorneys'
          fees and expenses, made by any third party due to or arising out of: (1) your
          Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of
          your representations and warranties set forth in these Legal Terms; (5) your violation of
          the rights of a third party, including but not limited to intellectual property rights; or
          (6) any overt harmful act toward any other user of the Services with whom you connected
          via the Services.
        </Typography>
        <Typography paragraph>
          Notwithstanding the foregoing, we reserve the right, at your expense, to assume the
          exclusive defense and control of any matter for which you are required to indemnify us,
          and you agree to cooperate, at your expense, with our defense of such claims. We will use
          reasonable efforts to notify you of any such claim, action, or proceeding which is subject
          to this indemnification upon becoming aware of it.
        </Typography>
        {/* Section 24 USER DATA */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          24. USER DATA
        </Typography>
        <Typography paragraph>
          We will maintain certain data that you transmit to the Services for the purpose of
          managing the performance of the Services, as well as data relating to your use of the
          Services. Although we perform regular routine backups of data, you are solely responsible
          for all data that you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any loss or corruption
          of any such data, and you hereby waive any right of action against us arising from any
          such loss or corruption of such data.
        </Typography>
        {/* Section 25 ELECTRONIC COMMUNICATIONS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
        </Typography>
        <Typography paragraph>
          Visiting the Services, sending us emails, and completing online forms constitute
          electronic communications. You consent to receive electronic communications, and you agree
          that all agreements, notices, disclosures, and other communications we provide to you
          electronically, via email and on the Services, satisfy any legal requirement that such
          communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
          CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
          RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive
          any rights or requirements under any statutes, regulations, rules, ordinances, or other
          laws in any jurisdiction which require an original signature or delivery or retention of
          non-electronic records, or to payments or the granting of credits by any means other than
          electronic means.
        </Typography>
        {/* Section 26 SMS TEXT MESSAGING */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          26. SMS TEXT MESSAGING
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
        >
          Opting Out
        </Typography>
        <Typography paragraph>
          If at any time you wish to stop receiving SMS messages from us, simply reply to the text
          with "STOP." You may receive an SMS message confirming your opt out.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
        >
          Message and Data Rates
        </Typography>
        <Typography paragraph>
          Please be aware that message and data rates may apply to any SMS messages sent or
          received. The rates are determined by your carrier and the specifics of your mobile plan.
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          gutterBottom
        >
          Support
        </Typography>
        <Typography paragraph>
          If you have any questions or need assistance regarding our SMS communications, please
          email us at allen_shintani@alaia-inc.com or call at 07039832820.
        </Typography>
        [{/* Section 27 CALIFORNIA USERS AND RESIDENTS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          27. CALIFORNIA USERS AND RESIDENTS
        </Typography>
        <Typography paragraph>
          If any complaint with us is not satisfactorily resolved, you can contact the Complaint
          Assistance Unit of the Division of Consumer Services of the California Department of
          Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento,
          California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
        </Typography>
        {/* Section 28 MISCELLANEOUS */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          28. MISCELLANEOUS
        </Typography>
        <Typography paragraph>
          These Legal Terms and any policies or operating rules posted by us on the Services or in
          respect to the Services constitute the entire agreement and understanding between you and
          us. Our failure to exercise or enforce any right or provision of these Legal Terms shall
          not operate as a waiver of such right or provision. These Legal Terms operate to the
          fullest extent permissible by law. We may assign any or all of our rights and obligations
          to others at any time. We shall not be responsible or liable for any loss, damage, delay,
          or failure to act caused by any cause beyond our reasonable control. If any provision or
          part of a provision of these Legal Terms is determined to be unlawful, void, or
          unenforceable, that provision or part of the provision is deemed severable from these
          Legal Terms and does not affect the validity and enforceability of any remaining
          provisions. There is no joint venture, partnership, employment or agency relationship
          created between you and us as a result of these Legal Terms or use of the Services. You
          agree that these Legal Terms will not be construed against us by virtue of having drafted
          them. You hereby waive any and all defenses you may have based on the electronic form of
          these Legal Terms and the lack of signing by the parties hereto to execute these Legal
          Terms.
        </Typography>
        {/* Section 29 CONFIDENTIALITY */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          29. CONFIDENTIALITY
        </Typography>
        <Typography paragraph>
          THE USER AGREES TO MAINTAIN THE CONFIDENTIALITY OF ANY PROPRIETARY OR CONFIDENTIAL
          INFORMATION OBTAINED THROUGH THE USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO:
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Technical information about the Service
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Personal information of other users
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Business information and trade secrets
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Any other information marked as confidential
          </Typography>
        </Box>
        <Typography paragraph>The User shall:</Typography>
        <Box
          component="ul"
          sx={{ pl: 4, mb: 3 }}
        >
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Not disclose such confidential information to any third party without prior written
            consent
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Take reasonable measures to prevent unauthorized access to confidential information
          </Typography>
          <Typography
            component="li"
            sx={{ mb: 1 }}
          >
            Use the confidential information only for purposes directly related to the use of the
            Service
          </Typography>
        </Box>
        {/* Section 30 GOVERNING LAW */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          30. GOVERNING LAW
        </Typography>
        <Typography paragraph>
          THESE TERMS AND CONDITIONS SHALL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE WITH THE LAWS
          OF JAPAN. ANY DISPUTES ARISING FROM OR IN CONNECTION WITH THESE TERMS AND CONDITIONS SHALL
          BE SUBJECT TO THE EXCLUSIVE JURISDICTION OF THE TOKYO DISTRICT COURT AS THE COURT OF FIRST
          INSTANCE. THE USER AGREES TO SUBMIT TO THE JURISDICTION OF SUCH COURTS.
        </Typography>
        <Typography paragraph>
          In the event of any conflict between the English and Japanese versions of these Terms and
          Conditions, the Japanese version shall prevail.
        </Typography>
        {/* Section 31 CONTACT US */}
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ mt: 6, mb: 3 }}
        >
          31. CONTACT US
        </Typography>
        <Typography paragraph>
          In order to resolve a complaint regarding the Services or to receive further information
          regarding use of the Services, please contact us at:
        </Typography>
        <Box sx={{ pl: 4, mb: 4 }}>
          <Typography>your_service_name, Inc.(株式会社アライア)</Typography>
          <Typography>Machiya</Typography>
          <Typography>Arakawa-ku, Tokyo 1160001</Typography>
          <Typography>Japan</Typography>
          <Typography>Phone: 07039832820</Typography>
          <Typography>allen_shintani@alaia-inc.com</Typography>
        </Box>
      </Paper>
    </Container>
  )
}
