#!/usr/bin/env bash
echo 'Rename Semantic css to scss and font-awesome'
mv ../../bower_components/font-awesome/css/font-awesome.min.css ../../bower_components/font-awesome/css/_awesome.scss
mv ../../bower_components/semantic/dist/semantic.min.css ../../bower_components/semantic/dist/_semantic.scss
echo 'Add Configuration Atomic Design'
mkdir css
mkdir assets
cd assets
touch style.scss
echo '@import "../bootstrap-sass/sass/bootstrap";
@import "../bootstrap-sass/sass/awesome.scss";
@import "semantic/semantic.scss";
@import "pattern-lab/00_atoms/01-images";
@import "pattern-lab/01_molecules/01-navigation";
@import "pattern-lab/02_organisms/01-article";
@import "pattern-lab/03_templates/01-landing-page";
@import "pattern-lab/04_pages/_01-home-pages.scss";' >> style.scss

mkdir images
mkdir js
mkdir pattern-lab
cd pattern-lab

mkdir 00_atoms
cd 00_atoms
touch _01-images.scss
cd ..

mkdir 01_molecules
cd 01_molecules
touch _01-navigation.scss
cd ..

mkdir 02_organisms
cd 02_organisms
touch _01-article.scss
cd ..

mkdir 03_templates
cd 03_templates
touch _01-landing-page.scss
cd ..

mkdir 04_pages
cd 04_pages
touch _01-home-pages.scss
