import Swal from 'sweetalert2';
import { errorExtractor } from "error-extractor";

class Sweet {
    
    public success(message: string): void {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Cool',
            confirmButtonColor: '#22c55e',
            background: '#1f2937',
            color: '#fff',
            toast: true,
            position: 'top',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    public error(err: any): void {
        const message = errorExtractor.getMessage(err);
        Swal.fire({
            title: 'Oops...',
            text: message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#dc2626',
            background: '#1f2937',
            color: '#fff',
            toast: true,
            position: 'top',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    public gameOver(level: number, score: number): void {
        Swal.fire({
            title: 'Game Over!',
            html: `
                <div style="color: #fff">
                    <p>You reached level ${level}</p>
                    <p>Final score: ${score}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Play Again',
            confirmButtonColor: '#2563eb',
            background: '#1f2937',
            color: '#fff',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    public levelUp(level: number): void {
        const difficulty = level <= 5 ? 'Normal' : level <= 10 ? 'Fast' : 'Insane';
        const color = level <= 5 ? '#22c55e' : level <= 10 ? '#eab308' : '#dc2626';
        
        Swal.fire({
            title: 'Level Up!',
            html: `
                <div style="color: #fff">
                    <p>You reached level ${level}</p>
                    <p style="color: ${color}">Difficulty: ${difficulty}</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: color,
            background: '#1f2937',
            color: '#fff',
            toast: true,
            position: 'top',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }
}

export const sweet = new Sweet();