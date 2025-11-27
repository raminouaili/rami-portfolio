import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, NgZone } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.css']
})
export class ParticlesComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private width: number = 0;
  private height: number = 0;
  
  // Configuration
  private particleCount = 80;
  private connectionDistance = 150;
  private mouseDistance = 200;
  
  private mouse = { x: -1000, y: -1000 };

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initCanvas();
    this.createParticles();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initCanvas();
    this.createParticles();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  private createParticles(): void {
    this.particles = [];
    // Adjust particle count based on screen size
    const count = window.innerWidth < 768 ? 40 : this.particleCount;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  private startAnimation(): void {
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        this.draw();
        this.animationId = requestAnimationFrame(animate);
      };
      animate();
    });
  }

  private stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Move
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'; // Slate-400 with opacity
      this.ctx.fill();
      
      // Connect to other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / this.connectionDistance)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
      
      // Connect to mouse
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouseDistance) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - distance / this.mouseDistance)})`; // Blue-400
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
    }
  }
}
