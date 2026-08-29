import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const ScrapmandiApp());
}

class ScrapmandiApp extends StatelessWidget {
  const ScrapmandiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Scrapmandi',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF059669),
          primary: const Color(0xFF059669),
          secondary: const Color(0xFF10B981),
          surface: const Color(0xFFF8FAFC),
          background: const Color(0xFF0F172A),
        ),
        fontFamily: 'Roboto',
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const BrowseLotsScreen(),
    const PostScrapScreen(),
    const SpotBhavScreen(),
    const WhatsAppAlertsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        backgroundColor: const Color(0xFF0F172A),
        indicatorColor: const Color(0xFF059669).withOpacity(0.3),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined, color: Colors.grey),
            selectedIcon: Icon(Icons.home, color: Color(0xFF10B981)),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.search_outlined, color: Colors.grey),
            selectedIcon: Icon(Icons.search, color: Color(0xFF10B981)),
            label: 'Browse',
          ),
          NavigationDestination(
            icon: Icon(Icons.add_circle_outline, color: Colors.grey),
            selectedIcon: Icon(Icons.add_circle, color: Color(0xFF10B981)),
            label: 'Sell',
          ),
          NavigationDestination(
            icon: Icon(Icons.trending_up_outlined, color: Colors.grey),
            selectedIcon: Icon(Icons.trending_up, color: Color(0xFF10B981)),
            label: 'Spot Bhav',
          ),
          NavigationDestination(
            icon: Icon(Icons.chat_bubble_outline, color: Colors.grey),
            selectedIcon: Icon(Icons.chat_bubble, color: Color(0xFF10B981)),
            label: 'WhatsApp',
          ),
        ],
      ),
    );
  }
}

// 1. HOME SCREEN
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            Image.asset(
              'assets/logo.png',
              width: 32,
              height: 32,
              errorBuilder: (_, __, ___) => const Icon(Icons.recycling, color: Color(0xFF10B981)),
            ),
            const SizedBox(width: 8),
            RichText(
              text: const TextSpan(
                text: 'Scrap',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                children: [
                  TextSpan(
                    text: 'mandi',
                    style: TextStyle(color: Color(0xFF10B981)),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: const Color(0xFF059669).withOpacity(0.2),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: const Color(0xFF059669).withOpacity(0.4)),
              ),
              child: const Text(
                'DELHI NCR',
                style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFF34D399)),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Live Ticker
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
              color: const Color(0xFF0F172A),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF10B981).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.circle, color: Color(0xFF10B981), size: 8),
                        SizedBox(width: 4),
                        Text(
                          'Delhi Bhav',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF34D399)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: Text(
                      'HMS 1: ₹38,800/t • Copper: ₹775/kg • OCC: ₹16/kg',
                      style: TextStyle(fontSize: 12, color: Colors.white70, fontWeight: FontWeight.w500),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),

            // Hero Section Banner
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF064E3B), Color(0xFF022C22)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF059669).withOpacity(0.4)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Sell • Buy • Recycle.',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Turning Waste Into Value.',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF34D399)),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Direct scrap trading across Mayapuri, Mundka, Bawana & Wazirpur yards. Zero dalal middleman commission.',
                    style: TextStyle(fontSize: 12, color: Colors.white70, height: 1.4),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.search, size: 16),
                        label: const Text('Find Scrap Lots'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: const Color(0xFF090D16),
                          textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Mandi Streams Grid
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Delhi Scrap Streams',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text('View All', style: TextStyle(color: Color(0xFF10B981), fontSize: 12)),
                  ),
                ],
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.3,
                children: const [
                  _CategoryTile(name: 'Loha & Steel', hindi: 'लोहा स्क्रैप', icon: Icons.hardware, rate: '₹38,800/t'),
                  _CategoryTile(name: 'Tamba & Peetal', hindi: 'तांबा एवं पीतल', icon: Icons.cable, rate: '₹775/kg'),
                  _CategoryTile(name: 'Raddi & Gatta', hindi: 'गत्ता एवं कागज', icon: Icons.inventory_2, rate: '₹16/kg'),
                  _CategoryTile(name: 'Plastic Dana', hindi: 'प्लास्टिक कबाड़', icon: Icons.recycling, rate: '₹47.50/kg'),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _CategoryTile extends StatelessWidget {
  final String name;
  final String hindi;
  final IconData icon;
  final String rate;

  const _CategoryTile({
    required this.name,
    required this.hindi,
    required this.icon,
    required this.rate,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: const Color(0xFF10B981), size: 24),
              Text(rate, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF34D399))),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
              Text(hindi, style: const TextStyle(fontSize: 10, color: Color(0xFF10B981))),
            ],
          ),
        ],
      ),
    );
  }
}

// 2. BROWSE LOTS SCREEN
class BrowseLotsScreen extends StatelessWidget {
  const BrowseLotsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text('Active Delhi Yard Lots', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          _ListingCard(
            title: 'HMS 1 Heavy Structure (80:20)',
            yard: 'Sharma Loha Scrap Yard • Mayapuri Phase 2',
            qty: '35 tonnes ready',
            rate: '₹38,800/t',
          ),
          _ListingCard(
            title: 'Copper Armature 99% Wire',
            yard: 'Salim Tamba Traders • Naraina Phase 1',
            qty: '2,800 kg ready',
            rate: '₹775/kg',
          ),
          _ListingCard(
            title: 'OCC Gatta Mill Baled',
            yard: 'Aggarwal Recyclers • Bawana Sector 3',
            qty: '24 tonnes ready',
            rate: '₹16.00/kg',
          ),
        ],
      ),
    );
  }
}

class _ListingCard extends StatelessWidget {
  final String title;
  final String yard;
  final String qty;
  final String rate;

  const _ListingCard({required this.title, required this.yard, required this.qty, required this.rate});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white))),
              Text(rate, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14, color: Color(0xFF34D399))),
            ],
          ),
          const SizedBox(height: 4),
          Text(yard, style: const TextStyle(fontSize: 11, color: Colors.grey)),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(qty, style: const TextStyle(fontSize: 11, color: Colors.white70)),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF059669),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  minimumSize: const Size(60, 30),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text('Inspect', style: TextStyle(fontSize: 11, color: Colors.white)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// 3. POST SCRAP SCREEN
class PostScrapScreen extends StatelessWidget {
  const PostScrapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text('Post Yard Lot (Vendor)', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('⚡ Rapid 60-Sec Post', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 6),
            const Text('Your lot is instantly broadcast to Mayapuri, Mundka & Bawana buyers.', style: TextStyle(fontSize: 12, color: Colors.grey)),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.camera_alt),
              label: const Text('Take Yard Photo'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0F172A),
                foregroundColor: const Color(0xFF10B981),
                side: const BorderSide(color: Color(0xFF059669)),
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. SPOT BHAV SCREEN
class SpotBhavScreen extends StatelessWidget {
  const SpotBhavScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text('Delhi Mandi Spot Bhav', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: const Center(
        child: Text('Live Mandi Benchmarks Updated Daily at 09:00 AM', style: TextStyle(color: Colors.grey)),
      ),
    );
  }
}

// 5. WHATSAPP ALERTS SCREEN
class WhatsAppAlertsScreen extends StatelessWidget {
  const WhatsAppAlertsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090D16),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text('WhatsApp Rate Digest', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Icon(Icons.chat, color: Color(0xFF25D366), size: 64),
            const SizedBox(height: 16),
            const Text('Daily 09:00 AM Mandi Bhav on WhatsApp', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16), textAlign: TextAlign.center),
            const SizedBox(height: 8),
            const Text('Receive verified spot rates for Mayapuri, Mundka, Bawana & Wazirpur.', style: TextStyle(color: Colors.grey, fontSize: 12), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
