import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QAComponent implements AfterViewInit, OnDestroy {
  private sidebar: HTMLElement | null = null;
  private trailEffect: HTMLElement | null = null;
  private trails: HTMLElement[] = [];
  private mailbox: HTMLElement | null = null;
  private mailboxTimeout: any;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private isDestroyed = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initializeElements();
    this.setupMouseEvents();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initializeElements(): void {
    this.sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.trailEffect = this.elementRef.nativeElement.querySelector('.trail-effect');
    
    if (!this.sidebar || !this.trailEffect) {
      console.warn('Required elements not found');
      return;
    }
  }

  private setupMouseEvents(): void {
    if (!this.sidebar) return;

    this.mouseMoveListener = this.handleMouseMove.bind(this);
    this.sidebar.addEventListener('mousemove', this.mouseMoveListener);
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.sidebar || this.isDestroyed) return;

    const rect = this.sidebar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.createTrail(x, y);
    this.createMailbox(x, y);
  }

  private createTrail(x: number, y: number): void {
    if (!this.trailEffect || this.isDestroyed) return;

    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      position: absolute;
      width: 10px;
      height: 10px;
      background: rgba(255, 255, 255, 0);
      border-radius: 50%;
      pointer-events: none;
      transition: all 0.3s ease;
    `;

    this.trailEffect.appendChild(trail);
    this.trails.push(trail);

    // Fade in
    requestAnimationFrame(() => {
      trail.style.opacity = '0.6';
      trail.style.transform = 'scale(1.2)';
      trail.style.background = 'rgba(255, 255, 255, 0.6)';
    });

    // Remove after animation
    setTimeout(() => {
      if (!this.isDestroyed && trail.parentNode) {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
        setTimeout(() => trail.remove(), 300);
      }
    }, 5000);
  }

  private createMailbox(x: number, y: number): void {
    if (!this.sidebar || this.isDestroyed) return;

    if (this.mailbox) {
      this.mailbox.remove();
    }
    clearTimeout(this.mailboxTimeout);

    this.mailbox = document.createElement('div');
    this.mailbox.className = 'mailbox';
    this.mailbox.style.cssText = `
      left: ${x - 20}px;
      top: ${y - 20}px;
      position: absolute;
      width: 40px;
      height: 40px;
      background: #ffffff;
      border-radius: 8px;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s ease;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    this.sidebar.appendChild(this.mailbox);

    // Animate in
    requestAnimationFrame(() => {
      if (this.mailbox) {
        this.mailbox.style.opacity = '1';
        this.mailbox.style.transform = 'scale(1)';
      }
    });

    // Remove after delay
    this.mailboxTimeout = setTimeout(() => {
      if (this.mailbox && !this.isDestroyed) {
        this.mailbox.style.opacity = '0';
        this.mailbox.style.transform = 'scale(0)';
        setTimeout(() => this.mailbox?.remove(), 300);
      }
    }, 5000);
  }

  private cleanup(): void {
    this.isDestroyed = true;
    
    if (this.sidebar && this.mouseMoveListener) {
      this.sidebar.removeEventListener('mousemove', this.mouseMoveListener);
    }

    if (this.mailbox) {
      this.mailbox.remove();
    }

    clearTimeout(this.mailboxTimeout);
    
    this.trails.forEach(trail => {
      if (trail.parentNode) {
        trail.remove();
      }
    });
    this.trails = [];
  }
}