import { ImgHTMLAttributes } from 'react';

// Type for vite-imagetools output with responsive images
interface ImageToolsOutput {
    src: string;
    srcset?: string;
}

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string | ImageToolsOutput;
    alt: string;
    width?: number;
    height?: number;
}

/**
 * OptimizedImage component that automatically uses WebP format with fallback
 * 
 * Usage:
 * import heroImage from '@/assets/hero.jpg?w=800&format=webp';
 * <OptimizedImage src={heroImage} alt="Hero" />
 * 
 * For responsive images:
 * import heroImage from '@/assets/hero.jpg?w=400;800;1200&format=webp';
 * <OptimizedImage src={heroImage} alt="Hero" />
 */
export const OptimizedImage = ({ src, alt, className, ...props }: OptimizedImageProps) => {
    // If src is a string (simple case), just use it
    if (typeof src === 'string') {
        return <img src={src} alt={alt} className={className} loading="lazy" {...props} />;
    }

    // If src is an object with srcset (responsive images from imagetools)
    if (typeof src === 'object' && 'src' in src) {
        return (
            <img
                src={src.src}
                srcSet={src.srcset}
                alt={alt}
                className={className}
                loading="lazy"
                {...props}
            />
        );
    }

    // Fallback
    return <img src={String(src)} alt={alt} className={className} loading="lazy" {...props} />;
};

export default OptimizedImage;
