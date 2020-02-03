import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import normal from './images/NORMAL-12494-3.jpeg';
import cnv from './images/CNV-53018-1.jpeg';
import dme from './images/DME-15208-2.jpeg';
import drusen from './images/DRUSEN-95633-1.jpeg';
import csr from './images/CSR91.jpeg';
import mh from './images/MH91.jpeg';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Detecting Retina Diseases from OCT-Retinal Images',
  description:
    "Working with typical optical coherence tomography (OCT) B-scan images of retina in a standard image file format.",
  image: normal,
};

const featuredPosts = [
  {
    title: 'Normal',
    description:
      'Normal vision occurs when light is focused directly on the retina rather than in front or behind it.',
    image: normal,
    link: 'https://en.wikipedia.org/wiki/Retina',
  },
  {
    title: 'Diabetic Macular Edema (DME)',
    description:
      'DME is a complication of diabetes caused by fluid accumulation in the macula that can affect the fovea.',
    image: dme,
    link: 'https://en.wikipedia.org/wiki/Macular_edema',
  },
  {
    title: 'Drusen',
    description:
      'Drusen are yellow deposits under the retina. Drusen are made up of lipids, a fatty protein.',
    image: drusen,
    link: 'https://en.wikipedia.org/wiki/Drusen',
  },
  {
    title: 'Central serous retinopathy (CSR)',
    description:
      'CSR is characterized by leakage of fluid under the retina that has a propensity to accumulate under the central macula.',
    image: csr,
    link: 'https://en.wikipedia.org/wiki/Central_serous_retinopathy',
  },
  {
    title: 'Macular hole (MH)',
    description:
      'A macular hole is a small break in the macula, located in the center of the eye\'s light-sensitive tissue called the retina.',
    image: mh,
    link: 'https://en.wikipedia.org/wiki/Macular_hole',
  },
  {
    title: 'Choroidal neovascularization (CNV)',
    description:
      'Choroidal neovascularization is the creation of new blood vessels in the choroid layer of the eye.',
    image: cnv,
    link: 'https://en.wikipedia.org/wiki/Choroidal_neovascularization',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
