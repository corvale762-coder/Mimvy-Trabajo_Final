<script>
        const items = document.querySelectorAll('.acordeon-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    </script>
</body>
</html>


const cards = document.querySelectorAll(".epic-card");



cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 25) * -1;
        const rotateY = (x - centerX) / 25;

        card.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.04)
        `;
    });



    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });

});