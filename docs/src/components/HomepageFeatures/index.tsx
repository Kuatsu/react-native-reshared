import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_easy_to_use.svg').default,
    description: (
      <>
        <code>react-native-reshared</code> is as minimal as possible. All of its functionality can be accessed from a
        single React hook.
      </>
    ),
  },
  {
    title: 'DX First',
    Svg: require('@site/static/img/undraw_dx.svg').default,
    description: <>Developer experience is a top priority in our API design.</>,
  },
  {
    title: 'Works with Expo',
    Svg: require('@site/static/img/undraw_expo.svg').default,
    description: (
      <>
        The library fully supports the Expo managed workflow using a config plugin. No need to eject to a bare workflow
        or pure React Native.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
